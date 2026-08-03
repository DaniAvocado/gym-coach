import { supabase } from './supabase'

// Supabase limita a 1000 filas por request; se pagina en bloques de 1000.
export async function fetchAllExercises(): Promise<any[]> {
  let all: any[] = []
  const PAGE = 1000
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.from('exercises').select('*').order('name').range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all = all.concat(data)
    if (data.length < PAGE) break
  }
  return all
}
