import CategoryForm from "@/components/admin/category/CategoryForm";

export default function AddCategoryPage() {
    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white border border-pink-100 rounded-2xl shadow-xl shadow-pink-900/5 mt-6">
            <h1 className="text-2xl font-bold mb-6 text-pink-950">
                Add New Category
            </h1>

            <CategoryForm />
        </div>
    );
}
