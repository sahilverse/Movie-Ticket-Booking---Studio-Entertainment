import watchBookingDeletions from "@/lib/mongoChangeStream";

watchBookingDeletions().catch(console.error);