import React from 'react';

const StudentList = ({ 
  students, 
  filteredStudents, 
  searchTerm, 
  onSearchChange, 
  onEdit, 
  onDelete, 
  onMenuChange 
}) => {
  return (
    <div className="table-section">
      <div className="section-header">
        <h2>Daftar Mahasiswa</h2>
        <button className="btn btn-primary" onClick={() => onMenuChange('tambah')}>
          <i className="fas fa-plus"></i> Tambah Data
        </button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Cari berdasarkan nama, NIM, atau jurusan..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="student-count">
          Menampilkan {filteredStudents.length} dari {students.length} mahasiswa
        </div>
      </div>
      
      {filteredStudents.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIM</th>
              <th>Jurusan</th>
              <th>Semester</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.nama}</td>
                <td>{student.nim}</td>
                <td>{student.jurusan}</td>
                <td>Semester {student.semester}</td>
                <td>{student.email}</td>
                <td className="actions">
                  <button 
                    className="btn btn-success" 
                    onClick={() => onEdit(student)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => onDelete(student.id)}
                  >
                    <i className="fas fa-trash"></i> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-message">
          {searchTerm ? 'Tidak ada data yang sesuai dengan pencarian' : 'Belum ada data mahasiswa. Silakan tambah data mahasiswa baru.'}
        </div>
      )}
    </div>
  );
};

export default StudentList;