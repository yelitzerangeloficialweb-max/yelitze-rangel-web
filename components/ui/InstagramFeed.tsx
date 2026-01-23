'use client';

import Script from 'next/script';
import Link from 'next/link';
import { Instagram } from 'lucide-react';

const INSTAGRAM_URL = "https://www.instagram.com/yelitzerangeloficial/";

export default function InstagramFeed() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Link
                        href={INSTAGRAM_URL}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[var(--color-secondary)] font-semibold tracking-widest uppercase hover:opacity-80 transition-opacity mb-4"
                    >
                        <Instagram className="w-5 h-5" />
                        @yelitzerangeloficial
                    </Link>
                    <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)]">
                        Sigue nuestra comunidad
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

                    {/* Post 1 */}
                    <div className="w-full flex justify-center max-w-[350px]">
                        <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTQCQnuDXy9/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%', width: '-webkit-calc(100% - 2px)', width: 'calc(100% - 2px)' }}>
                            <div style={{ padding: '16px' }}> <a href="https://www.instagram.com/p/DTQCQnuDXy9/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '19% 0' }}></div>
                                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}>
                                    {/* Icon SVG omitted for brevity/safety, Instagram script handles replacement anyway */}
                                </div>
                                <div style={{ paddingTop: '8px' }}>
                                    <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>Ver esta publicación en Instagram</div>
                                </div>
                                <div style={{ padding: '12.5% 0' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                                </div>
                            </a>
                                <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <a href="https://www.instagram.com/p/DTQCQnuDXy9/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank">Una publicación compartida de Yelitzé Rangel Oficial (@yelitzerangeloficial)</a>
                                </p>
                            </div>
                        </blockquote>
                    </div>

                    {/* Post 2 */}
                    <div className="w-full flex justify-center max-w-[350px]">
                        <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTfG-cWAI1J/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%', width: '-webkit-calc(100% - 2px)', width: 'calc(100% - 2px)' }}>
                            <div style={{ padding: '16px' }}> <a href="https://www.instagram.com/p/DTfG-cWAI1J/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '19% 0' }}></div>
                                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}></div>
                                <div style={{ paddingTop: '8px' }}>
                                    <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>Ver esta publicación en Instagram</div>
                                </div>
                                <div style={{ padding: '12.5% 0' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                                </div>
                            </a>
                                <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <a href="https://www.instagram.com/p/DTfG-cWAI1J/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank">Una publicación compartida de Yelitzé Rangel Oficial (@yelitzerangeloficial)</a>
                                </p>
                            </div>
                        </blockquote>
                    </div>

                    {/* Post 3 */}
                    <div className="w-full flex justify-center max-w-[350px]">
                        <blockquote className="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/DTtMjnGkgns/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style={{ background: '#FFF', border: 0, borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: 0, width: '99.375%', width: '-webkit-calc(100% - 2px)', width: 'calc(100% - 2px)' }}>
                            <div style={{ padding: '16px' }}> <a href="https://www.instagram.com/p/DTtMjnGkgns/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ background: '#FFFFFF', lineHeight: 0, padding: '0 0', textAlign: 'center', textDecoration: 'none', width: '100%' }} target="_blank">
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '50%', flexGrow: 0, height: '40px', marginRight: '14px', width: '40px' }}></div>
                                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '100px' }}></div>
                                        <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '60px' }}></div>
                                    </div>
                                </div>
                                <div style={{ padding: '19% 0' }}></div>
                                <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}></div>
                                <div style={{ paddingTop: '8px' }}>
                                    <div style={{ color: '#3897f0', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 550, lineHeight: '18px' }}>Ver esta publicación en Instagram</div>
                                </div>
                                <div style={{ padding: '12.5% 0' }}></div>
                                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center', marginBottom: '24px' }}>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', marginBottom: '6px', width: '224px' }}></div>
                                    <div style={{ backgroundColor: '#F4F4F4', borderRadius: '4px', flexGrow: 0, height: '14px', width: '144px' }}></div>
                                </div>
                            </a>
                                <p style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', lineHeight: '17px', marginBottom: 0, marginTop: '8px', overflow: 'hidden', padding: '8px 0 7px', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    <a href="https://www.instagram.com/p/DTtMjnGkgns/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: '#c9c8cd', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none' }} target="_blank">Una publicación compartida de Yelitzé Rangel Oficial (@yelitzerangeloficial)</a>
                                </p>
                            </div>
                        </blockquote>
                    </div>
                </div>

                <Script src="//www.instagram.com/embed.js" strategy="lazyOnload" />
            </div>
        </section>
    );
}
