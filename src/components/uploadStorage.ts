import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid'

export const uploadStorage = async (
  supabase: SupabaseClient,
  bucket: string,
  filePath: string,
  file: File | Blob
) => {
  console.log('file', file)
  console.log('path', filePath)
  try {
    const { data: fileData, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) throw error

    const imageKey = fileData.path
    console.log('key', imageKey)

    const { data: publicSrc } = supabase.storage
      .from(bucket)
      .getPublicUrl(imageKey)

    return publicSrc.publicUrl
  } catch (error) {
    console.error(error)
  }
}

export const createPath = () => {
  const uuid: string = uuidv4()
  const filePath: string = uuid.split('-').join('')
  return filePath
}
