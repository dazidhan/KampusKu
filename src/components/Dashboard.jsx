import React from 'react';

const Dashboard = ({ students, onMenuChange, onEdit }) => {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => parseInt(s.semester) <= 8).length;
  const recentStudents = students.filter(s => parseInt(s.semester) <= 2).length;

  return (
    <div>
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-icon" style={{backgroundColor: '#2a5298'}}>
            <i className="fas fa-users"></i>
          </div>
          <div className="card-info">
            <h3>{totalStudents}</h3>
            <p>Total Mahasiswa</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" style={{backgroundColor: '#28a745'}}>
            <i className="fas fa-user-check"></i>
          </div>
          <div className="card-info">
            <h3>{activeStudents}</h3>
            <p>Mahasiswa Aktif</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" style={{backgroundColor: '#17a2b8'}}>
            <i className="fas fa-user-graduate"></i>
          </div>
          <div className="card-info">
            <h3>{recentStudents}</h3>
            <p>Mahasiswa Baru</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon" style={{backgroundColor: '#ffc107'}}>
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="card-info">
            <h3>5</h3>
            <p>Jurusan Tersedia</p>
          </div>
        </div>
      </div>
      
      <div className="table-section">
        <div className="section-header">
          <h2>Data Mahasiswa Terbaru</h2>
          <button className="btn btn-primary" onClick={() => onMenuChange('data')}>
            <i className="fas fa-list"></i> Lihat Semua Data
          </button>
        </div>
        
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>NIM</th>
                <th>Jurusan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.nama}</td>
                  <td>{student.nim}</td>
                  <td>{student.jurusan}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-success" 
                      title="Edit"
                      onClick={() => onEdit(student)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-danger" 
                      title="Hapus"
                      onClick={() => {
                        if (window.confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
                          // Handle delete akan diproses di parent component
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-message">
            Belum ada data mahasiswa. Silakan tambah data mahasiswa baru.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;