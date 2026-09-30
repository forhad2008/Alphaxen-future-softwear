import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, CheckCircle, Download } from 'lucide-react';
import { FontItem } from '../../types/fontLab';
import confetti from 'canvas-confetti';

interface CartItem {
  font: FontItem;
  licenseId: string;
  price: number;
}

interface CartModalProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  items,
  onClose,
  onRemoveItem,
  onClearCart
}) => {
  const [checkedOut, setCheckedOut] = useState<boolean>(false);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    setCheckedOut(true);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0a0a0f] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* HEADER */}
        <div className="p-6 bg-[#0e0e14] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="font-display-serif text-xl font-bold text-white">
              Commercial Foundry Cart ({items.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {checkedOut ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Order Confirmed!</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Thank you for supporting independent punchcutting. Your font files and commercial license certificate are being dispatched.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-400">Your commercial cart is currently empty.</p>
              <p className="text-xs text-zinc-600">Select any typeface from Our Latest Creations to acquire licensing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-white font-display-serif">
                      {item.font.name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 block capitalize">
                      License: {item.licenseId} Edition (OTF / TTF / WOFF2)
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono font-bold text-red-400">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER TOTAL & CHECKOUT */}
        {items.length > 0 && !checkedOut && (
          <div className="p-6 bg-[#0e0e14] border-t border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-zinc-400">SUBTOTAL</span>
              <span className="text-xl font-bold text-white">${subtotal} USD</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Includes perpetual commercial usage rights & zero telemetry.</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 rounded-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-semibold text-sm shadow-[0_0_20px_rgba(220,38,38,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Complete Acquisition (${subtotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
