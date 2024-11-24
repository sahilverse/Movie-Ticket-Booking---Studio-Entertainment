"use client"
import React, { useState } from "react";
import { PlusIcon, MinusIcon, CheckIcon, RotateCcwIcon } from "lucide-react";

interface Seat {
    id: string;
    row: number;
    column: number;
    status: "available" | "removed";
    price: number;
}

interface Layout {
    rows: number;
    columns: number;
    seats: Seat[];
}

export default function TheaterLayoutManager() {
    const [rows, setRows] = useState<number>(5);
    const [columns, setColumns] = useState<number>(8);
    const [basePrice, setBasePrice] = useState<number>(10);
    const [removedSeats, setRemovedSeats] = useState<Set<string>>(new Set());
    const [previewLayout, setPreviewLayout] = useState<Layout | null>(null);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());
    const [rowGaps, setRowGaps] = useState<number[]>([]);
    const [columnGaps, setColumnGaps] = useState<number[]>([]);
    const [showFinalLayout, setShowFinalLayout] = useState<boolean>(false);
    const [finalLayout, setFinalLayout] = useState<Layout | null>(null);

    const generateLayout = () => {
        const seats: Seat[] = [];
        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns; col++) {
                const seatId = `${row}-${col}`;
                seats.push({
                    id: seatId,
                    row,
                    column: col,
                    status: removedSeats.has(seatId) ? "removed" : "available",
                    price: removedSeats.has(seatId)
                        ? 0
                        : basePrice + Math.floor((row - 1) / 2) * 2,
                });
            }
        }
        setPreviewLayout({ rows, columns, seats });
        setShowPreview(true);
    };

    const handleSeatClick = (row: number, col: number) => {
        const seatId = `${row}-${col}`;
        const updatedSeats = new Set(selectedSeats);
        if (updatedSeats.has(seatId)) {
            updatedSeats.delete(seatId);
        } else {
            updatedSeats.add(seatId);
        }
        setSelectedSeats(updatedSeats);
    };

    const handleRemoveSeats = () => {
        const updatedRemovedSeats = new Set(removedSeats);
        selectedSeats.forEach((seatId) => updatedRemovedSeats.add(seatId));
        setRemovedSeats(updatedRemovedSeats);
        setSelectedSeats(new Set());
        generateLayout();
    };

    const handleConfirmLayout = () => {
        if (previewLayout) {
            console.log("Layout confirmed:", previewLayout);
            alert("Layout confirmed and saved");
            setFinalLayout(previewLayout);
            setShowFinalLayout(true);
        }
    };

    const handleResetLayout = () => {
        setRemovedSeats(new Set());
        setPreviewLayout(null);
        setShowPreview(false);
        setSelectedSeats(new Set());
        setShowFinalLayout(false);
        setFinalLayout(null);
        setRowGaps([]);
        setColumnGaps([]);
    };

    const handleAddRowGap = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const row = parseInt(e.target.value);
        if (row > 0 && row < rows && !rowGaps.includes(row)) {
            setRowGaps([...rowGaps, row].sort((a, b) => a - b));
        }
    };

    const handleAddColumnGap = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const col = parseInt(e.target.value);
        if (col > 0 && col < columns && !columnGaps.includes(col)) {
            setColumnGaps([...columnGaps, col].sort((a, b) => a - b));
        }
    };

    const renderScreen = () => (
        <div className="flex items-center justify-center w-full h-8 mb-8 bg-gray-800 rounded-t-lg">
            <span className="text-sm font-bold text-white">Screen</span>
        </div>
    );

    const renderSeats = (layout: Layout, isPreview = true) => (
        <div className="grid gap-4 place-content-center">
            {Array.from({ length: layout.rows }, (_, rowIndex) => (
                <React.Fragment key={rowIndex + 1}>
                    <div className="flex gap-4">
                        {Array.from({ length: layout.columns }, (_, colIndex) => {
                            const seat = layout.seats.find(
                                (s) => s.row === rowIndex + 1 && s.column === colIndex + 1
                            );
                            if (!seat) return null;
                            return (
                                <React.Fragment key={`${rowIndex + 1}-${colIndex + 1}`}>
                                    {seat.status === "removed" ? (
                                        <div className="w-10 h-10" />
                                    ) : (
                                        <button
                                            className={`w-10 h-10 rounded-md text-xs font-bold flex items-center justify-center
                        ${isPreview && selectedSeats.has(seat.id)
                                                    ? "bg-purple-500 text-white"
                                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                                }`}
                                            onClick={() =>
                                                isPreview && handleSeatClick(seat.row, seat.column)
                                            }
                                            disabled={!isPreview}
                                        >
                                            {`${seat.row}-${seat.column}`}
                                        </button>
                                    )}
                                    {columnGaps.includes(colIndex + 1) && <div className="w-6" />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    {rowGaps.includes(rowIndex + 1) && <div className="h-6" />}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl p-6 mx-auto">
            <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-6 text-2xl font-bold">Theater Layout Configuration</h2>

                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="rows"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Number of Rows
                            </label>
                            <input
                                id="rows"
                                type="text"
                                min="1"
                                value={rows}
                                onChange={(e) => setRows(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="columns"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Number of Columns
                            </label>
                            <input
                                id="columns"
                                type="text"
                                min="1"
                                value={columns}
                                onChange={(e) => setColumns(Number(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="basePrice"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Base Price ($)
                        </label>
                        <input
                            id="basePrice"
                            type="text"
                            min="0"
                            value={basePrice}
                            onChange={(e) => setBasePrice(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="rowGap"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Add Row Gap (after row)
                            </label>
                            <select
                                id="rowGap"
                                onChange={handleAddRowGap}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            >
                                <option value="">Select row</option>
                                {Array.from({ length: rows - 1 }, (_, i) => i + 1).map((row) => (
                                    <option key={row} value={row}>
                                        After row {row}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="columnGap"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Add Column Gap (after column)
                            </label>
                            <select
                                id="columnGap"
                                onChange={handleAddColumnGap}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                            >
                                <option value="">Select column</option>
                                {Array.from({ length: columns - 1 }, (_, i) => i + 1).map(
                                    (col) => (
                                        <option key={col} value={col}>
                                            After column {col}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={generateLayout}
                        className="flex items-center justify-center w-full p-2 text-white transition duration-200 bg-gray-800 rounded-md hover:bg-gray-600"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Generate Layout Preview
                    </button>
                </div>
            </div>

            {showPreview && previewLayout && (
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-bold">Layout Preview</h3>

                    <div className="mb-6 overflow-x-auto">
                        <div className="inline-block min-w-full">
                            {renderScreen()}
                            {renderSeats(previewLayout)}
                        </div>
                    </div>

                    <div className="p-4 space-y-4 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="mb-4 text-lg font-semibold">Modify Layout</h3>

                        <div>
                            <label
                                htmlFor="selectedSeats"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Selected Seats
                            </label>
                            <input
                                id="selectedSeats"
                                type="text"
                                value={
                                    selectedSeats.size > 0
                                        ? Array.from(selectedSeats).join(", ")
                                        : ""
                                }
                                readOnly
                                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md text-black"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleRemoveSeats}
                                disabled={selectedSeats.size === 0}
                                className={`flex-1 border bg-black border-gray-300 p-2 rounded-md  transition duration-200 flex items-center justify-center
                  ${selectedSeats.size === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <MinusIcon className="w-5 h-5 mr-2" />
                                Remove Seats
                            </button>
                            <button
                                onClick={generateLayout}
                                className="flex items-center justify-center flex-1 p-2 text-white transition duration-200 bg-gray-800 rounded-md hover:bg-gray-600"
                            >
                                <RotateCcwIcon className="w-5 h-5 mr-2" />
                                Regenerate Layout
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6">
                        <button
                            onClick={handleConfirmLayout}
                            className="flex items-center justify-center flex-1 p-2 text-white transition duration-200 bg-green-500 rounded-md hover:bg-green-600"
                        >
                            <CheckIcon className="w-5 h-5 mr-2" />
                            Confirm Layout
                        </button>
                        <button
                            onClick={handleResetLayout}
                            className="flex items-center justify-center flex-1 p-2 transition duration-200 border border-gray-300 rounded-md hover:bg-gray-100"
                        >
                            <RotateCcwIcon className="w-5 h-5 mr-2" />
                            Reset Layout
                        </button>
                    </div>
                </div>
            )}

            {showFinalLayout && finalLayout && (
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="mb-4 text-xl font-bold">Final Layout</h3>

                    <div className="mb-6 overflow-x-auto">
                        <div className="inline-block min-w-full">
                            {renderScreen()}
                            {renderSeats(finalLayout, false)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
