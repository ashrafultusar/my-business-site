export interface Product {
    id: string | number;
    title: string;
    price: number;
    oldPrice?: number;
    imageSrc: string;
    rating: number;
    category: "streetwear" | "premium" | "accessories";
    isNew?: boolean;
    discount?: number;
    description?: string;
    features?: string[];
    sizes?: string[];
    sku?: string;
    inStock?: boolean;
    reviews?: number;
    images?: string[];
}

export const DUMMY_PRODUCTS: Product[] = [
    {
        id: 1,
        title: "Premium Oversized Cyberpunk Hoodie - Midnight Black",
        price: 2450,
        oldPrice: 3200,
        imageSrc: "/assets/image.jpg",
        rating: 4.9,
        category: "streetwear",
        isNew: true,
        discount: 23,
        description: "Elevate your street style with our flagship Cyberpunk Hoodie. Crafted with heavyweight 400GSM organic cotton fleece, this oversized silhouette offers maximum comfort without compromising on form. Features custom gunmetal hardware, asymmetric seam details, and a built-in snood collar for versatile styling.",
        features: ["Heavyweight 400GSM 100% Organic Cotton", "Oversized drop-shoulder fit", "Asymmetric paneled construction", "Custom gunmetal finished hardware"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        sku: "SW-0192-MB",
        inStock: true,
        reviews: 128,
        images: ["/assets/image.jpg", "/assets/image.jpg", "/assets/image.jpg", "/assets/image.jpg"],
    },
    {
        id: 2,
        title: "Luxury Velvet Evening Dress - Deep Magenta Edition",
        price: 4800,
        imageSrc: "/assets/image.jpg",
        rating: 4.8,
        category: "premium",
        isNew: true,
        description: "Experience ultimate luxury with this deep magenta evening dress made from premium woven velvet.",
        features: ["Premium woven velvet", "Body-contouring fit", "Backless design"],
        sizes: ["XS", "S", "M", "L"],
        sku: "PR-2023-MG",
        inStock: true,
        reviews: 64,
        images: ["/assets/image.jpg", "/assets/image.jpg"],
    },
    {
        id: 3,
        title: "Futuristic Techwear Cargo Pants with Quick-Release Straps",
        price: 1850,
        oldPrice: 2200,
        imageSrc: "/assets/image.jpg",
        rating: 4.5,
        category: "streetwear",
        discount: 15,
        description: "High-performance techwear cargo pants with multiple utility pockets and quick-release straps.",
        features: ["Water-resistant nylon", "Quick-release straps", "6 Utility pockets"],
        sizes: ["S", "M", "L", "XL"],
        sku: "SW-CP33",
        inStock: true,
        reviews: 95,
        images: ["/assets/image.jpg"],
    },
    {
        id: 4,
        title: "Matte Black Cyber Shield Sunglasses - UV400 Protected",
        price: 1200,
        imageSrc: "/assets/image.jpg",
        rating: 4.2,
        category: "accessories",
        description: "UV400 protected futuristic sunglasses with a wraparound shield design.",
        features: ["UV400 Protection", "Shatterproof Polycarbonate", "Matte Black Frame"],
        sizes: ["One Size"],
        sku: "AC-SUN-01",
        inStock: true,
        reviews: 42,
        images: ["/assets/image.jpg"],
    },
    {
        id: 5,
        title: "Premium Handcrafted Leather Boots - Urban Classic",
        price: 5500,
        oldPrice: 6800,
        imageSrc: "/assets/image.jpg",
        rating: 4.7,
        category: "premium",
        description: "Handcrafted genuine leather boots designed for urban durability and classic style.",
        features: ["Genuine Top-Grain Leather", "Vibram Outsole", "Hand-stitched welt"],
        sizes: ["40", "41", "42", "43", "44"],
        sku: "PR-BT-09",
        inStock: false,
        reviews: 215,
        images: ["/assets/image.jpg", "/assets/image.jpg"],
    },
    {
        id: 6,
        title: "Adjustable Tactical Utility Belt - Neon Cyber Accents",
        price: 850,
        imageSrc: "/assets/image.jpg",
        rating: 4.4,
        category: "accessories",
        isNew: true,
        description: "Tactical utility belt with neon cyber accents and heavy-duty magnetic buckle.",
        features: ["Nylon Webbing", "Magnetic Buckle", "Molle compatible"],
        sizes: ["One Size"],
        sku: "AC-BLT-99",
        inStock: true,
        reviews: 18,
        images: ["/assets/image.jpg"],
    },
    {
        id: 7,
        title: "Streetwear Graphic Tee - Limitless Possibilities",
        price: 990,
        oldPrice: 1400,
        imageSrc: "/assets/image.jpg",
        rating: 4.6,
        category: "streetwear",
        discount: 29,
        description: "Heavyweight boxy fit graphic tee with a high-density screen print.",
        features: ["250GSM Cotton", "Boxy Fit", "High-density puff print"],
        sizes: ["S", "M", "L", "XL"],
        sku: "SW-TEE-LP",
        inStock: true,
        reviews: 310,
        images: ["/assets/image.jpg"],
    },
    {
        id: 8,
        title: "Minimalist Smart Chronograph Watch - Titanium Shell",
        price: 3900,
        imageSrc: "/assets/image.jpg",
        rating: 4.3,
        category: "accessories",
        description: "Smart chronograph watch encased in a premium titanium shell with sapphire glass.",
        features: ["Titanium Shell", "Sapphire Glass", "Smart connectivity"],
        sizes: ["One Size"],
        sku: "AC-WTC-TI",
        inStock: true,
        reviews: 55,
        images: ["/assets/image.jpg"],
    }
];
