import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
    const { data, error } = await supabase.from('cabins').select('*');

    if (error) {
        console.error(error);
        throw Error('Cabins could not be loaded');
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from('cabins').delete().eq('id', id);

    if (error) {
        console.error(error);
        throw Error('Cabins could not be deleted');
    }

    return data;
}

export async function addCabin(newData) {
    const imageName = `${Math.random()}-${newData.image.name.replaceAll('/', '')}`;
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newData, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw Error('Cabins could not be added');
    }

    const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newData.image);

    if (storageError) {
        await supabase.from('cabins').delete().eq('id', data.id);

        console.error(storageError);
        throw Error('Cabin image could not be uploaded');
    }

    return data;
}

export async function updateCabin(id, updateData) {
    const { data, error } = await supabase
        .from('cabins')
        .update(...updateData)
        .eq('id', id)
        .select();

    if (error) {
        console.error(error);
        throw Error('Cabins could not be updated');
    }

    return data;
}
