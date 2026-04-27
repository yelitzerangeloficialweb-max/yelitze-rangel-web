'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, ChevronDown, ChevronUp, Package, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    createdAt: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    city: string;
    country: string;
    paymentMethod: string;
    status: string;
    total: number;
    items: OrderItem[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleExpand = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-stone-100 text-stone-600';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-secondary)]" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading text-[var(--color-primary)] font-bold">
                        Pedidos
                    </h1>
                    <p className="text-stone-500">{orders.length} pedidos registrados</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-stone-200 mx-auto mb-4" />
                    <h2 className="text-xl font-heading text-[var(--color-primary)] mb-2">No hay pedidos</h2>
                    <p className="text-stone-500">Aún no se han realizado compras en la web.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
                            {/* Order Header */}
                            <div 
                                onClick={() => toggleExpand(order.id)}
                                className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-[var(--color-primary)]">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[var(--color-primary)]">
                                            Order #{order.id.slice(0, 8)}
                                        </p>
                                        <p className="text-sm text-stone-500 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(order.createdAt), "d 'de' MMMM, yyyy - HH:mm", { locale: es })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs text-stone-400 uppercase tracking-wider font-bold">Total</p>
                                        <p className="text-xl font-bold text-[var(--color-secondary)]">${order.total.toFixed(2)}</p>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </div>
                                    {expandedOrder === order.id ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
                                </div>
                            </div>

                            {/* Order Details (Expanded) */}
                            {expandedOrder === order.id && (
                                <div className="p-6 border-t border-stone-100 bg-stone-50/50">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Customer Info */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">Información del Cliente</h3>
                                            <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Package className="w-5 h-5 text-[var(--color-secondary)]" />
                                                    <p className="font-bold">{order.customerName}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-stone-600">
                                                    <Mail className="w-4 h-4" />
                                                    <p className="text-sm">{order.customerEmail}</p>
                                                </div>
                                                <div className="flex items-center gap-3 text-stone-600">
                                                    <Phone className="w-4 h-4" />
                                                    <p className="text-sm">{order.customerPhone}</p>
                                                </div>
                                                <div className="flex items-start gap-3 text-stone-600 border-t border-stone-100 pt-4">
                                                    <MapPin className="w-4 h-4 mt-1" />
                                                    <div className="text-sm">
                                                        <p>{order.address}</p>
                                                        <p>{order.city}, {order.country}</p>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-stone-400 pt-2 uppercase font-bold tracking-wider">
                                                    Método de Pago: {order.paymentMethod}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Info */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest">Productos del Pedido</h3>
                                            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                                                <table className="w-full">
                                                    <thead className="bg-stone-50 border-b border-stone-200">
                                                        <tr>
                                                            <th className="text-left px-4 py-3 text-[10px] font-bold text-stone-400 uppercase">Producto</th>
                                                            <th className="text-center px-4 py-3 text-[10px] font-bold text-stone-400 uppercase">Cant.</th>
                                                            <th className="text-right px-4 py-3 text-[10px] font-bold text-stone-400 uppercase">Precio</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-stone-100">
                                                        {order.items.map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="px-4 py-3 text-sm font-medium text-[var(--color-primary)]">{item.name}</td>
                                                                <td className="px-4 py-3 text-sm text-center text-stone-600">{item.quantity}</td>
                                                                <td className="px-4 py-3 text-sm text-right font-bold text-[var(--color-secondary)]">${item.price.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                    <tfoot className="bg-stone-50 border-t border-stone-200">
                                                        <tr>
                                                            <td colSpan={2} className="px-4 py-3 text-sm font-bold text-right text-stone-500">Total:</td>
                                                            <td className="px-4 py-3 text-lg font-bold text-right text-[var(--color-secondary)]">${order.total.toFixed(2)}</td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
