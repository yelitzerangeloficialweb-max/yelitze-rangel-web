import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { startOfMonth, endOfMonth } from 'date-fns';

import { ensureAvailabilityTables } from '@/lib/db-init';

export async function GET(request: NextRequest) {
    try {
        await ensureAvailabilityTables();
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month'); // Expecting format YYYY-MM
        const year = searchParams.get('year');

        let startDate: Date;
        let endDate: Date;

        if (month && year) {
            const baseDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, 1));
            startDate = startOfMonth(baseDate);
            endDate = endOfMonth(baseDate);
        } else {
            // Default to current month and next month
            const now = new Date();
            startDate = startOfMonth(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)));
            endDate = endOfMonth(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 2, 0)));
        }

        // 1. Fetch office-offered availability
        const offeredAvailability = await db.availability.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        // 2. Fetch existing appointments
        const appointments = await db.appointment.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate
                },
                status: { not: 'cancelled' }
            }
        });

        // 3. Process availability
        // Filter out offered slots that are already booked
        const processedAvailability = offeredAvailability.map(avail => {
            const dayAppointments = appointments.filter(app => 
                app.date.toDateString() === avail.date.toDateString()
            );

            const isMorningBooked = dayAppointments.some(app => app.slot === 'morning');
            const isAfternoonBooked = dayAppointments.some(app => app.slot === 'afternoon');

            return {
                date: avail.date,
                morningFree: avail.morningEnabled && !isMorningBooked,
                afternoonFree: avail.afternoonEnabled && !isAfternoonBooked
            };
        }).filter(day => day.morningFree || day.afternoonFree);

        return NextResponse.json(processedAvailability);
    } catch (error) {
        console.error('Error fetching public availability:', error);
        return NextResponse.json({ error: 'Error fetching availability' }, { status: 500 });
    }
}
