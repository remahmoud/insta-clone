import { useState } from "react";
import Modal from "modalix";
import { FaPlus } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import useCreatePost from "@src/api/hooks/useCreatePost";
import { useQueryClient } from "@tanstack/react-query";

export default function PostForm() {
    const queryClient = useQueryClient();
    const { mutateAsync } = useCreatePost();
    const [isOpen, setIsOpen] = useState(false);
    const [preview, setPreview] = useState<File | null>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("caption", data.caption);
        await mutateAsync(formData, {
            onSuccess: () => {
                setIsOpen(false);
                setPreview(null);
                reset();
                queryClient.invalidateQueries(["posts"]);
            },
        });
    };
    return (
        <div>
            <button
                className="flex items-center gap-2 bg-pink-500 text-white text-sm px-2 py-0.5 rounded"
                onClick={() => setIsOpen(true)}
            >
                <span>Create post</span>
                <FaPlus className="w-3 h-3" />
            </button>
            <Modal visible={isOpen} onClickOut={() => setIsOpen(false)}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-4 bg-white flex flex-col rounded-md w-96"
                >
                    <h2 className="text-3xl font-semibold mb-4 text-center">
                        Create post
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="image">
                            <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-2.5 py-1 rounded cursor-pointer">
                                <FcPicture className="w-6 h-6" />
                                <span>Upload image</span>
                            </div>
                        </label>

                        <input
                            id="image"
                            type="file"
                            {...register("image", {
                                required: true,
                                onChange: (e) => {
                                    if (e.target.files) {
                                        setPreview(e.target.files[0]);
                                    }
                                },
                            })}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    {preview && (
                        <div className="mb-4">
                            <img
                                src={URL.createObjectURL(preview)}
                                alt="preview"
                                className="w-full h-60 object-cover rounded-md"
                            />
                        </div>
                    )}
                    <textarea
                        {...register("caption", {
                            maxLength: 250,
                        })}
                        rows={5}
                        maxLength={250}
                        className={clsx(
                            "p-3 resize-none focus:outline-none border border-gray-300 rounded-lg mb-4",
                            errors.caption && "border-red-500"
                        )}
                    />
                    <button
                        type="submit"
                        className="w-full py-1.5 text-white bg-blue-600 font-medium rounded-md"
                    >
                        Publish
                    </button>
                </form>
            </Modal>
        </div>
    );
}
