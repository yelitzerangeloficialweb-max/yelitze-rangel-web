async function main() {
    try {
        console.log('Fetching local products from http://localhost:3030/api/products ...');
        const res = await fetch('http://localhost:3030/api/products');
        console.log('Status:', res.status);
        const data = await res.json();
        console.log('Products:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Error fetching:', e.message);
    }
}
main();
