import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/Form/FormRow';

import { useForm } from 'react-hook-form';
import { addCabin } from '../../services/apiCabins';

function CreateCabinForm() {
    // Create useHook
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    // react-query: Setup useMutation
    const { isLoading: isAdding, mutate } = useMutation({
        mutationFn: (data) => addCabin(data),
        onSuccess: () => {
            toast.success('Cabin successfully added');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    // react-hook-form
    const onSubmit = (data) => {
        mutate({ ...data, image: data.image[0] });
    };

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label={'name'} error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    {...register('name', {
                        required: 'This field is required',
                    })}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow label={'maxCapacity'} error={errors?.maxCapacity?.message}>
                <Input
                    type="number"
                    id="maxCapacity"
                    {...register('maxCapacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'maxCapacity should be at least 1',
                        },
                    })}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow
                label={'regularPrice'}
                error={errors?.regularPrice?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    {...register('regularPrice', {
                        required: 'This field is required',
                    })}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow label={'discount'} error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            value <= getValues().regularPrice ||
                            'Discount should be equal to or less than regularPrice',
                    })}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow label={'description'} error={errors?.description?.message}>
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow label={'image'} error={errors?.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    {...register('image')}
                    disabled={isAdding}
                />
            </FormRow>
            <FormRow>
                <Button variation="secondary" type="reset" disabled={isAdding}>
                    Cancel
                </Button>
                <Button disabled={isAdding}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
