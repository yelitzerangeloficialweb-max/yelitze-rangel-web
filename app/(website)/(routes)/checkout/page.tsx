'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FadeIn } from '@/components/ui/motion';
import { ArrowLeft, ShoppingBag, CreditCard, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';

type PaymentMethod = 'paypal' | 'zelle' | 'whatsapp';

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'USA'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const generateWhatsAppMessage = (idToUse?: string) => {
        const activeId = idToUse || orderId || '';
        const itemsList = items.map(item =>
            `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`
        ).join('%0A');

        const orderInfo = activeId ? `*Pedido ID:* #${activeId.substring(0, 8)}...%0A%0A` : '';

        const message = `¡Hola! Quiero realizar un pedido:%0A%0A${orderInfo}${itemsList}%0A%0A*Total: $${getTotal().toFixed(2)} USD*%0A%0A*Datos de envío:*%0ANombre: ${formData.name}%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0ADirección: ${formData.address}, ${formData.city}, ${formData.country}`;

        return `https://wa.me/17867268717?text=${message}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!paymentMethod) return;

        setIsSubmitting(true);
        setErrorMsg(null);

        try {
            const orderItems = items.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            }));

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: formData.name,
                    customerEmail: formData.email,
                    customerPhone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    country: formData.country,
                    paymentMethod,
                    total: getTotal(),
                    items: orderItems
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error al procesar el pedido');
            }

            const createdOrder = await response.json();
            setOrderId(createdOrder.id);
            setIsSubmitted(true);

            // Intentar abrir WhatsApp inmediatamente si es el método elegido
            if (paymentMethod === 'whatsapp') {
                const whatsappUrl = generateWhatsAppMessage(createdOrder.id);
                window.open(whatsappUrl, '_blank');
            }
        } catch (error: any) {
            console.error('Checkout error:', error);
            setErrorMsg(error.message || 'Ocurrió un error inesperado al procesar tu pedido. Por favor, inténtalo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0 && !isSubmitted) {
        return (
            <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <ShoppingBag className="w-20 h-20 text-stone-200 mx-auto mb-6" />
                        <h1 className="text-3xl font-heading text-[var(--color-primary)] mb-4">
                            Tu carrito está vacío
                        </h1>
                        <p className="text-stone-500 mb-8">Añade productos para continuar con tu compra</p>
                        <Link
                            href="/tienda"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                            Ir a la Tienda
                        </Link>
                    </FadeIn>
                </div>
            </main>
        );
    }

    if (isSubmitted) {
        return (
            <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-4 text-center max-w-xl">
                    <FadeIn>
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-heading text-[var(--color-primary)] mb-4">
                            ¡Gracias por tu pedido!
                        </h1>
                        <p className="text-lg text-stone-600 mb-8">
                            {paymentMethod === 'whatsapp'
                                ? 'Tu pedido ha sido registrado en nuestro sistema y te hemos redirigido a WhatsApp para confirmar los detalles.'
                                : paymentMethod === 'paypal'
                                    ? 'Tu pedido ha sido registrado en nuestro sistema. Procede con el pago en PayPal y envíanos el comprobante por WhatsApp.'
                                    : 'Tu pedido ha sido registrado en nuestro sistema. Realiza tu transferencia por Zelle y envíanos el comprobante por WhatsApp.'}
                        </p>

                        <div className="bg-white p-6 rounded-2xl border border-stone-200 mb-6 text-left space-y-2 text-stone-600">
                            <h3 className="font-bold text-[var(--color-primary)] mb-1">Resumen del registro:</h3>
                            <p><strong>Pedido ID:</strong> #{orderId?.substring(0, 8) || ''}</p>
                            <p><strong>Total a pagar:</strong> ${getTotal().toFixed(2)} USD</p>
                            <p><strong>Método seleccionado:</strong> {paymentMethod === 'whatsapp' ? 'WhatsApp' : paymentMethod === 'paypal' ? 'PayPal' : 'Zelle'}</p>
                        </div>

                        {paymentMethod === 'paypal' && (
                            <a
                                href="https://paypal.me/yelitzerangel"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-4 bg-[#0070BA] text-white font-bold rounded-xl mb-4 hover:bg-[#005ea6] transition-colors"
                            >
                                Pagar con PayPal - ${getTotal().toFixed(2)} USD
                            </a>
                        )}

                        {paymentMethod === 'zelle' && (
                            <div className="bg-white p-6 rounded-2xl border border-stone-200 mb-6 text-left">
                                <h3 className="font-bold text-[var(--color-primary)] mb-3">Datos para Zelle:</h3>
                                <p className="text-stone-600">
                                    <strong>Email:</strong> pagos@yelitzerangel.com<br />
                                    <strong>Monto:</strong> ${getTotal().toFixed(2)} USD<br />
                                    <strong>Referencia/Memo:</strong> Pedido #{orderId?.substring(0, 8) || ''}
                                </p>
                            </div>
                        )}

                        <a
                            href={generateWhatsAppMessage()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-green-500 text-white font-bold rounded-xl mb-4 hover:bg-green-600 transition-colors"
                        >
                            {paymentMethod === 'whatsapp' ? '📲 Enviar pedido por WhatsApp' : '📲 Enviar comprobante por WhatsApp'}
                        </a>

                        <button
                            onClick={() => {
                                clearCart();
                                setIsSubmitted(false);
                            }}
                            className="text-stone-500 hover:text-[var(--color-secondary)] transition-colors"
                        >
                            Volver a la tienda
                        </button>
                    </FadeIn>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#FAF9F6] min-h-screen pt-28 pb-20">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <Link
                        href="/tienda"
                        className="inline-flex items-center gap-2 text-stone-500 hover:text-[var(--color-secondary)] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a la tienda
                    </Link>
                </FadeIn>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <FadeIn>
                        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                            <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-6">
                                Resumen del Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                {items.map(({ product, quantity }) => (
                                    <div key={product.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-[var(--color-primary)]">{product.name}</h3>
                                            <p className="text-sm text-stone-500">Cantidad: {quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-bold text-[var(--color-primary)]">
                                                ${(product.price * quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-stone-100 pt-4 space-y-2">
                                <div className="flex justify-between text-stone-600">
                                    <span>Subtotal</span>
                                    <span>${getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Envío</span>
                                    <span className="text-sm italic">A calcular</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-[var(--color-primary)] pt-2">
                                    <span>Total</span>
                                    <span>${getTotal().toFixed(2)} USD</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Checkout Form */}
                    <FadeIn delay={0.1}>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Customer Info */}
                            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                                <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-6">
                                    Datos de Envío
                                </h2>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Teléfono</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Dirección</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">Ciudad</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-stone-700 mb-1">País</label>
                                            <select
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-[var(--color-secondary)] transition-colors"
                                            >
                                                <option value="USA">Estados Unidos</option>
                                                <option value="Venezuela">Venezuela</option>
                                                <option value="Colombia">Colombia</option>
                                                <option value="Mexico">México</option>
                                                <option value="Argentina">Argentina</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                                <h2 className="text-2xl font-heading text-[var(--color-primary)] mb-6">
                                    Método de Pago
                                </h2>

                                <div className="grid gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${paymentMethod === 'paypal'
                                            ? 'border-[#0070BA] bg-[#0070BA]/5'
                                            : 'border-stone-200 hover:border-stone-300'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6 text-[#0070BA]" />
                                        <div className="text-left">
                                            <span className="font-bold text-[#0070BA]">PayPal</span>
                                            <p className="text-sm text-stone-500">Tarjeta o saldo PayPal</p>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('zelle')}
                                        className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${paymentMethod === 'zelle'
                                            ? 'border-[#6D28D9] bg-[#6D28D9]/5'
                                            : 'border-stone-200 hover:border-stone-300'
                                            }`}
                                    >
                                        <CreditCard className="w-6 h-6 text-[#6D28D9]" />
                                        <div className="text-left">
                                            <span className="font-bold text-[#6D28D9]">Zelle</span>
                                            <p className="text-sm text-stone-500">Transferencia directa</p>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('whatsapp')}
                                        className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${paymentMethod === 'whatsapp'
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-stone-200 hover:border-stone-300'
                                            }`}
                                    >
                                        <MessageCircle className="w-6 h-6 text-green-500" />
                                        <div className="text-left">
                                            <span className="font-bold text-green-600">WhatsApp</span>
                                            <p className="text-sm text-stone-500">Coordinar pago directamente</p>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {errorMsg && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!paymentMethod || isSubmitting}
                                className="w-full py-5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Registrando pedido...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Confirmar Pedido
                                    </>
                                )}
                            </button>
                        </form>
                    </FadeIn>
                </div>
            </div>
        </main>
    );
}
