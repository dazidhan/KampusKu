import React from 'react';

const StudentForm = ({ formData, isEditing, onInputChange, onSubmit, onReset }) => {
  return (
    <div className="form-section">
      <div className="section-header">
        <h2>{isEditing ? 'Edit Data Mahasiswa' : 'Tambah Data Mahasiswa Baru'}</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={onInputChange}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="nim">NIM</label>
            <input
              type="text"
              id="nim"
              name="nim"
              value={formData.nim}
              onChange={onInputChange}
              placeholder="Masukkan NIM"
              disabled={isEditing}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="jurusan">Jurusan</label>
            <select
              id="jurusan"
              name="jurusan"
              value={formData.jurusan}
              onChange={onInputChange}
              required
            >
              <option value="">Pilih Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
              <option value="Teknik Elektro">Teknik Elektro</option>
              <option value="Teknik Mesin">Teknik Mesin</option>
              <option value="Teknik Sipil">Teknik Sipil</option>
              <option value="Manajemen">Manajemen</option>
              <option value="Akuntansi">Akuntansi</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={onInputChange}
              required
            >
              <option value="">Pilih Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Masukkan alamat email"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? (
              <>
                <i className="fas fa-check"></i> Update Data
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i> Tambah Data
              </>
            )}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={onReset}>
              <i className="fas fa-times"></i> Batal Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;