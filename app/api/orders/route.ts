import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            address,
            city,
            country,
            paymentMethod,
            total,
            items
        } = body;

        // Validación de datos requeridos
        if (
            !customerName ||
            !customerEmail ||
            !customerPhone ||
            !address ||
            !city ||
            !country ||
            !paymentMethod ||
            total === undefined ||
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return NextResponse.json(
                { error: 'Faltan datos requeridos para completar el pedido' },
                { status: 400 }
            );
        }

        // Crear la orden y sus ítems dentro de una transacción de Prisma
        const order = await db.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                address,
                city,
                country,
                paymentMethod,
                total: parseFloat(total.toString()),
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        name: item.name,
                        price: parseFloat(item.price.toString()),
                        quantity: parseInt(item.quantity.toString(), 10)
                    }))
                }
            },
            include: {
                items: true
            }
        });

        console.log(`[ORDERS_POST] Pedido registrado con éxito. ID: ${order.id}`);

        return NextResponse.json(order);
    } catch (error) {
        console.error('[ORDERS_POST] Error al registrar la orden:', error);
        return NextResponse.json(
            { error: 'Ocurrió un error al procesar el registro de la orden' },
            { status: 500 }
        );
    }
}
