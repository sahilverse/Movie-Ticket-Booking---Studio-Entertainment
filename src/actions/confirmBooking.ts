"use server"

import { prisma } from "@/lib/prisma"
import { BookingStatus, SeatStatus, User } from "@prisma/client"
import { currentUser } from "@/lib/auth";


