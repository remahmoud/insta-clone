import useCreateComment from "@src/api/hooks/useCreateComment";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    text: string;
};

type Props = {
    postId: string;
};

export default function CommentForm({ postId }: Props) {
    const queryClient = useQueryClient();
    const { mutateAsync } = useCreateComment();
    const { handleSubmit, register, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await mutateAsync(
            { id: postId, text: data.text },
            {
                onSuccess: () => {
                    reset();
                    queryClient.invalidateQueries({
                        queryKey: ["post", postId],
                    });
                },
            }
        );
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-4"
        >
            <textarea
                className="border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write a comment..."
                {...register("text", { required: true })}
            ></textarea>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Comment
            </button>
        </form>
    );
}
