const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting test order registration...');

    // Find a product in the DB to associate with the order items (or use a dummy product ID)
    const products = await prisma.product.findMany({ take: 1 });
    const productId = products[0]?.id || 'dummy-product-id';
    const productName = products[0]?.name || 'Producto de Prueba';
    const productPrice = products[0]?.price || 19.99;

    console.log(`Using product: ${productName} (ID: ${productId}, Price: $${productPrice})`);

    const orderData = {
        customerName: 'Juan Pérez',
        customerEmail: 'juan.perez@example.com',
        customerPhone: '+17865551234',
        address: '123 Calle Falsa',
        city: 'Miami',
        country: 'USA',
        paymentMethod: 'zelle',
        total: parseFloat((productPrice * 2).toFixed(2)),
        items: {
            create: [
                {
                    productId: productId,
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: 2
                }
            ]
        }
    };

    const createdOrder = await prisma.order.create({
        data: orderData,
        include: {
            items: true
        }
    });

    console.log('Order successfully created!');
    console.log('Order ID:', createdOrder.id);
    console.log('Order Details:', JSON.stringify(createdOrder, null, 2));

    // Cleanup the test order so we don't pollute the user's DB
    console.log('Cleaning up test order...');
    await prisma.orderItem.deleteMany({
        where: { orderId: createdOrder.id }
    });
    await prisma.order.delete({
        where: { id: createdOrder.id }
    });
    console.log('Cleanup complete. DB is clean!');
}

main()
    .catch(e => {
        console.error('Error during test:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
