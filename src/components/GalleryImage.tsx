
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FaArrowLeft,
    FaArrowRight,
    FaTimes,
    FaExpand,
} from "react-icons/fa";

type GalleryImage = {
    id: number;
    title: string;
    category: string;
    image: string;
};

const images: GalleryImage[] = [
    {
        id: 1,
        title: "Mountain Adventure",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900",
    },
    {
        id: 2,
        title: "Ocean Waves",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900",
    },
    {
        id: 3,
        title: "Modern Architecture",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900",
    },
    {
        id: 4,
        title: "Beautiful Forest",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900",
    },
    {
        id: 5,
        title: "City Lifestyle",
        category: "Urban",
        image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
    },
    {
        id: 6,
        title: "Desert Landscape",
        category: "Nature",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900",
    },
    {
        id: 7,
        title: "Minimal Interior",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
    },
    {
        id: 8,
        title: "Street Photography",
        category: "Urban",
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=900",
    },
];

const categories = ["All", "Nature", "Architecture", "Urban"];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

export default function GalleryImage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedImage, setSelectedImage] =
        useState<GalleryImage | null>(null);

    const filteredImages =
        activeCategory === "All"
            ? images
            : images.filter(
                (image) => image.category === activeCategory
            );

    const selectedIndex = images.findIndex(
        (image) => image.id === selectedImage?.id
    );

    const closePreview = () => setSelectedImage(null);

    const showNextImage = () => {
        const nextIndex = (selectedIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    };

    const showPreviousImage = () => {
        const previousIndex =
            (selectedIndex - 1 + images.length) % images.length;

        setSelectedImage(images[previousIndex]);
    };

    // Keyboard controls and body scroll lock
    useEffect(() => {
        if (!selectedImage) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closePreview();
            if (event.key === "ArrowRight") showNextImage();
            if (event.key === "ArrowLeft") showPreviousImage();
        };

        document.body.style.overflow = "hidden";

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedImage, selectedIndex]);

    return (
        <section className="min-h-screen bg-slate-950 px-5 py-16 text-white sm:px-8">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-block rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
                        MY CREATIVE COLLECTION
                    </span>

                    <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Explore Our{" "}
                        <span className="text-indigo-400">
                            Gallery
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                        Discover beautiful moments, creative photography
                        and stunning visuals in our modern image gallery.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="mb-10 flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                                : "border border-slate-700 bg-slate-900 text-slate-400 hover:border-indigo-400 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <motion.div
                    key={activeCategory}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {filteredImages.map((image) => (
                        <motion.div
                            key={image.id}
                            variants={itemVariants}
                            layout
                            whileHover={{ y: -7 }}
                            className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
                            onClick={() => setSelectedImage(image)}
                        >
                            <motion.img
                                src={image.image}
                                alt={image.title}
                                loading="lazy"
                                whileHover={{ scale: 1.12 }}
                                transition={{ duration: 0.5 }}
                                className="h-full w-full object-cover"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">

                                <span className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-300">
                                    {image.category}
                                </span>

                                <h3 className="text-xl font-semibold">
                                    {image.title}
                                </h3>

                                <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                                    <FaExpand size={12} />
                                    View Image
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Image Preview Modal */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={closePreview}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.3 }}
                                onClick={(event) => event.stopPropagation()}
                                className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closePreview}
                                    aria-label="Close preview"
                                    className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-3 text-white transition hover:bg-red-500"
                                >
                                    <FaTimes />
                                </button>

                                {/* Preview Image */}
                                <div className="relative flex h-[55vh] items-center justify-center bg-black sm:h-[70vh]">
                                    <motion.img
                                        key={selectedImage.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        src={selectedImage.image}
                                        alt={selectedImage.title}
                                        className="h-full w-full object-contain"
                                    />

                                    {/* Previous Button */}
                                    <button
                                        onClick={showPreviousImage}
                                        aria-label="Previous image"
                                        className="absolute left-3 rounded-full bg-black/60 p-3 text-white transition hover:bg-indigo-500 sm:left-5 sm:p-4"
                                    >
                                        <FaArrowLeft />
                                    </button>

                                    {/* Next Button */}
                                    <button
                                        onClick={showNextImage}
                                        aria-label="Next image"
                                        className="absolute right-3 rounded-full bg-black/60 p-3 text-white transition hover:bg-indigo-500 sm:right-5 sm:p-4"
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>

                                {/* Image Information */}
                                <div className="flex items-center justify-between gap-4 p-5">
                                    <div>
                                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                                            {selectedImage.category}
                                        </span>

                                        <h2 className="mt-1 text-lg font-semibold sm:text-2xl">
                                            {selectedImage.title}
                                        </h2>
                                    </div>

                                    <span className="shrink-0 text-sm text-slate-400">
                                        {selectedIndex + 1} / {images.length}
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center text-sm text-slate-500"
                >
                    Showing {filteredImages.length} beautiful images
                </motion.p>

            </div>
        </section>
    );
}
