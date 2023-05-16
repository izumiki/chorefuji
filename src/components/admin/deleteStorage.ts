import { SupabaseClient } from '@supabase/supabase-js'

const deleteStorage = async (
  supabase: SupabaseClient,
  bucket: string,
  filePath: string
) => {
  try {
    console.log(filePath)
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([filePath])

    if (error) throw error
  } catch (error) {
    console.error(error)
  }
}

export default deleteStorage
