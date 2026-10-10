import supabase from "../config/supabaseClient.js";

// READ: Ambil semua data peminjaman dengan filter query optional
export const getLoans = async (filters = {}) => {
  let query = supabase.from("loans").select("*");

  // Filter berdasarkan status peminjaman ('borrowed' / 'returned')
  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  // Filter berdasarkan nama anggota (case-insensitive search)
  if (filters.member_name) {
    query = query.ilike("member_name", `%${filters.member_name}%`);
  }

  // Filter berdasarkan judul buku (case-insensitive search)
  if (filters.book_title) {
    query = query.ilike("book_title", `%${filters.book_title}%`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

// READ BY ID: Ambil detail 1 peminjaman
export const getLoanById = async (id) => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

// CREATE: Tambah peminjaman baru
export const createLoan = async (loanData) => {
  const { member_name, book_title, return_date } = loanData;
  const { data, error } = await supabase
    .from("loans")
    .insert([{ member_name, book_title, return_date, status: "borrowed" }])
    .select();

  if (error) throw error;
  return data;
};

// UPDATE: Perbarui data peminjaman (misal ubah status/tanggal)
export const updateLoan = async (id, updateData) => {
  const { data, error } = await supabase
    .from("loans")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};

// DELETE: Hapus data peminjaman
export const deleteLoan = async (id) => {
  const { data, error } = await supabase
    .from("loans")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};