import { Save, RotateCcw } from 'lucide-react';

const ProductForm = ({methods,onSubmit,onFormReset}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;


    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6" style={{ marginBottom: '5px' }}>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("id")}
                    type="hidden" />
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name*
                        </label>
                        <input
                            type="text"
                            {...register("name",{
                                required: true,
                                maxLength:100
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2" placeholder="Enter name"
                        />
                        {errors.name?.type === "required" && 
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                Name required
                            </p>
                        }
                        {errors.name?.type === "maxLength" && 
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                            Name cannot exceed 100 characters
                        </p>
                        }
                    </div>

                    <div className="flex-1">
                        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700 mb-2">
                            Unit Price*
                        </label>
                        <input
                            type="number"
                            id="unitPrice"
                            name="unitPrice"
                            step="0.01"
                            {...register("unitPrice",{
                                required: true,
                                min:0
                            })}
                            className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2" placeholder="Enter unit price"
                        />
                        {errors.unitPrice?.type === "required" && <p className="mt-1 text-sm text-red-600 flex items-center">
                            UnitPrice required
                        </p>}
                        {errors.unitPrice?.type === "min" && <p className="mt-1 text-sm text-red-600 flex items-center">
                            UnitPrice must be at least 0
                        </p>}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <Save className="w-4 h-4 mr-2" />
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                        onClick={onFormReset}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm