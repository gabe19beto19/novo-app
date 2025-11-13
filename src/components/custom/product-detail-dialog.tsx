"use client";

import { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, MessageCircle, Phone } from "lucide-react";

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {product.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                {product.category}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Vendedor: {product.seller}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Publicado em {formatDate(product.createdAt)}</span>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enviar Mensagem
              </Button>
              <Button variant="outline" className="w-full h-12 border-2">
                <Phone className="w-5 h-5 mr-2" />
                Ver Telefone
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-bold text-lg mb-3">Descrição</h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
