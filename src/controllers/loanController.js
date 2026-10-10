import * as loanModel from "../models/loanModel.js";

// GET /api/loans (Mengambil data peminjaman & menerapkan filter query)
export const getAllLoans = async (req, res) => {
  try {
    const { status, member_name, book_title } = req.query;
    const loans = await loanModel.getLoans({ status, member_name, book_title });

    res.status(200).json({
      success: true,
      count: loans.length,
      data: loans,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/loans/:id
export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await loanModel.getLoanById(id);

    if (!loan) {
      return res.status(404).json({ success: false, message: "Data peminjaman tidak ditemukan" });
    }

    res.status(200).json({ success: true, data: loan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/loans
export const createLoan = async (req, res) => {
  try {
    const { member_name, book_title, return_date } = req.body;

    if (!member_name || !book_title) {
      return res.status(400).json({
        success: false,
        message: "member_name dan book_title wajib diisi",
      });
    }

    const newLoan = await loanModel.createLoan({ member_name, book_title, return_date });

    res.status(201).json({
      success: true,
      message: "Peminjaman buku berhasil dicatat",
      data: newLoan[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/loans/:id
export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedLoan = await loanModel.updateLoan(id, updateData);

    if (!updatedLoan || updatedLoan.length === 0) {
      return res.status(404).json({ success: false, message: "Data peminjaman tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Data peminjaman berhasil diperbarui",
      data: updatedLoan[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/loans/:id
export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLoan = await loanModel.deleteLoan(id);

    if (!deletedLoan || deletedLoan.length === 0) {
      return res.status(404).json({ success: false, message: "Data peminjaman tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Data peminjaman berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};