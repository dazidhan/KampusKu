import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  // State untuk data mahasiswa
  const [students, setStudents] = useState([]);
  
  // State untuk form
  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    nim: '',
    jurusan: '',
    semester: '',
    email: ''
  });
  
  // State untuk mode edit
  const [isEditing, setIsEditing] = useState(false);
  
  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk notifikasi
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    show: false
  });
  
  // State untuk menu aktif
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  // Menampilkan notifikasi
  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      show: true
    });
    
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };
  
  // Inisialisasi data contoh
  useEffect(() => {
    const sampleData = [
      { id: 1, nama: 'Ahmad Fauzi', nim: '20210001', jurusan: 'Teknik Informatika', semester: '5', email: 'ahmad@example.com' },
      { id: 2, nama: 'Siti Rahayu', nim: '20210002', jurusan: 'Sistem Informasi', semester: '3', email: 'siti@example.com' },
      { id: 3, nama: 'Budi Santoso', nim: '20210003', jurusan: 'Teknik Elektro', semester: '7', email: 'budi@example.com' },
      { id: 4, nama: 'Dewi Lestari', nim: '20210004', jurusan: 'Manajemen', semester: '5', email: 'dewi@example.com' },
      { id: 5, nama: 'Rizki Pratama', nim: '20210005', jurusan: 'Akuntansi', semester: '3', email: 'rizki@example.com' }
    ];
    setStudents(sampleData);
  }, []);
  
  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Fungsi untuk menangani submit form (Create/Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi NIM unik
    if (!isEditing && students.some(student => student.nim === formData.nim)) {
      showNotification('NIM sudah terdaftar!', 'error');
      return;
    }
    
    if (isEditing) {
      // Update data mahasiswa
      setStudents(students.map(student => 
        student.id === formData.id ? formData : student
      ));
      showNotification('Data mahasiswa berhasil diperbarui!', 'success');
    } else {
      // Tambah data mahasiswa baru
      const newStudent = {
        ...formData,
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1
      };
      setStudents([...students, newStudent]);
      showNotification('Data mahasiswa berhasil ditambahkan!', 'success');
    }
    
    // Reset form
    resetForm();
  };
  
  // Fungsi untuk mengisi form dengan data yang akan diedit
  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
    setActiveMenu('tambah');
    showNotification('Siap mengedit data mahasiswa', 'info');
  };
  
  // Fungsi untuk menghapus data mahasiswa
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data mahasiswa ini?')) {
      setStudents(students.filter(student => student.id !== id));
      showNotification('Data mahasiswa berhasil dihapus!', 'success');
    }
  };
  
  // Fungsi untuk mereset form
  const resetForm = () => {
    setFormData({
      id: '',
      nama: '',
      nim: '',
      jurusan: '',
      semester: '',
      email: ''
    });
    setIsEditing(false);
  };
  
  // Filter data berdasarkan pencarian
  const filteredStudents = students.filter(student => 
    student.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.jurusan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Render konten berdasarkan menu aktif
  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <Dashboard 
            students={students} 
            onMenuChange={setActiveMenu}
            onEdit={handleEdit}
          />
        );
      case 'tambah':
        return (
          <StudentForm 
            formData={formData}
            isEditing={isEditing}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onReset={resetForm}
          />
        );
      case 'data':
        return (
          <StudentList 
            students={students}
            filteredStudents={filteredStudents}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMenuChange={setActiveMenu}
          />
        );
      default:
        return <div>Halaman tidak ditemukan</div>;
    }
  };
  
  return (
    <>
      {/* Notifikasi */}
      <div className={`notification ${notification.type} ${notification.show ? 'show' : ''}`}>
        <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
        {notification.message}
      </div>
      
      {/* Container untuk layout utama */}
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="logo">
            <h1><i className="fas fa-graduation-cap"></i> KampusKu</h1>
            <p>Manajemen Data Mahasiswa</p>
          </div>
          
          <ul className="menu">
            <li 
              className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveMenu('dashboard')}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </li>
            <li 
              className={`menu-item ${activeMenu === 'tambah' ? 'active' : ''}`}
              onClick={() => { setActiveMenu('tambah'); resetForm(); }}
            >
              <i className="fas fa-user-plus"></i>
              <span>Tambah</span>
            </li>
            <li 
              className={`menu-item ${activeMenu === 'data' ? 'active' : ''}`}
              onClick={() => setActiveMenu('data')}
            >
              <i className="fas fa-list"></i>
              <span>Data</span>
            </li>
            <li className="menu-item">
              <i className="fas fa-cog"></i>
              <span>Pengaturan</span>
            </li>
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <h2>
              {activeMenu === 'dashboard' && 'Dashboard'}
              {activeMenu === 'tambah' && (isEditing ? 'Edit Data Mahasiswa' : 'Tambah Data Mahasiswa')}
              {activeMenu === 'data' && 'Daftar Semua Mahasiswa'}
            </h2>
            <div className="user-info">
              <div className="user-avatar">AD</div>
              <span>Admin</span>
            </div>
          </div>
          
          <div className="content">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;