import React from 'react';
import { useParams } from 'react-router-dom';

function Newhal() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Article {id}</h1>
        <img 
          src={`/assets/information1.jpg`} 
          alt={`Article ${id}`} 
          className="mb-6 w-1/2 mx-auto h-auto rounded-lg shadow-lg object-cover"
        />
        <div className="text-gray-800 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Jenis-Jenis Sampah dan Cara Pengelolaannya</h2>
          <p className="mb-4">Sampah merupakan masalah lingkungan yang semakin mendesak untuk diatasi. Pengelolaan sampah yang efektif dapat mengurangi dampak negatif terhadap lingkungan dan kesehatan manusia. Berikut ini adalah jenis-jenis sampah yang perlu kita ketahui serta cara pengelolaannya.</p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Berdasarkan Asal</h3>
          <ol className="list-decimal ml-5 mb-4">
            <li className="mb-2">
              <strong>Sampah Rumah Tangga:</strong> Sampah yang berasal dari aktivitas sehari-hari di rumah, seperti sisa makanan, kertas, plastik, dan kaleng. Contoh pengelolaan yang efektif adalah pemisahan sampah organik dan anorganik serta mendaur ulang bahan yang dapat digunakan kembali.
            </li>
            <li className="mb-2">
              <strong>Sampah Industri:</strong> Sampah yang dihasilkan dari proses produksi di pabrik dan industri, seperti limbah kimia, logam, dan bahan beracun. Sampah ini membutuhkan penanganan khusus untuk mencegah pencemaran lingkungan.
            </li>
            <li className="mb-2">
              <strong>Sampah Komersial:</strong> Sampah yang dihasilkan dari aktivitas bisnis dan komersial, seperti sampah dari toko, restoran, dan kantor. Pengelolaan yang baik melibatkan pemisahan dan daur ulang sampah serta pengurangan penggunaan bahan yang tidak ramah lingkungan.
            </li>
            <li className="mb-2">
              <strong>Sampah Pertanian:</strong> Sampah yang berasal dari kegiatan pertanian, seperti sisa tanaman, jerami, dan kotoran hewan. Sampah organik dari pertanian sering kali diolah menjadi kompos yang dapat digunakan sebagai pupuk alami.
            </li>
            <li className="mb-2">
              <strong>Sampah Konstruksi dan Pembongkaran:</strong> Sampah yang dihasilkan dari kegiatan pembangunan dan pembongkaran bangunan, seperti beton, kayu, dan logam. Bahan-bahan ini dapat didaur ulang atau digunakan kembali dalam proyek konstruksi lain.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-2">Berdasarkan Komposisi</h3>
          <ol className="list-decimal ml-5 mb-4">
            <li className="mb-2">
              <strong>Sampah Organik:</strong> Sampah yang dapat terurai secara alami, seperti sisa makanan, daun, dan kotoran hewan. Pengelolaan yang efektif meliputi komposting, yaitu proses penguraian sampah organik menjadi pupuk kompos.
            </li>
            <li className="mb-2">
              <strong>Sampah Anorganik:</strong> Sampah yang tidak mudah terurai dan biasanya berasal dari bahan-bahan sintetis, seperti plastik, kaca, logam, dan kertas. Sampah ini dapat didaur ulang untuk mengurangi volume sampah yang berakhir di tempat pembuangan akhir.
            </li>
            <li className="mb-2">
              <strong>Sampah B3 (Bahan Berbahaya dan Beracun):</strong> Sampah yang mengandung bahan berbahaya dan beracun, seperti baterai bekas, limbah kimia, dan pestisida. Pengelolaan sampah B3 memerlukan penanganan khusus untuk mencegah pencemaran lingkungan dan risiko kesehatan.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-2">Berdasarkan Dampaknya terhadap Lingkungan</h3>
          <ol className="list-decimal ml-5 mb-4">
            <li className="mb-2">
              <strong>Sampah yang Dapat Didaur Ulang:</strong> Sampah yang bisa diolah kembali menjadi produk baru, seperti kertas, kaca, plastik, dan logam. Daur ulang adalah langkah penting dalam mengurangi jumlah sampah dan menghemat sumber daya alam.
            </li>
            <li className="mb-2">
              <strong>Sampah yang Tidak Dapat Didaur Ulang:</strong> Sampah yang sulit atau tidak bisa diolah kembali, sering kali membutuhkan penanganan khusus, seperti beberapa jenis plastik dan bahan kimia. Upaya pengurangan penggunaan bahan-bahan ini perlu ditingkatkan.
            </li>
            <li className="mb-2">
              <strong>Sampah Berbahaya:</strong> Sampah yang mengandung bahan beracun atau berbahaya bagi kesehatan manusia dan lingkungan, seperti limbah medis dan bahan kimia industri. Sampah ini harus dikelola dengan hati-hati untuk mencegah pencemaran dan bahaya kesehatan.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-2">Contoh Penanganan Sampah</h3>
          <ol className="list-decimal ml-5 mb-4">
            <li className="mb-2">
              <strong>Pemisahan Sampah:</strong> Memisahkan sampah organik dan anorganik di rumah tangga untuk memudahkan proses daur ulang dan komposting. Dengan memilah sampah, kita dapat mengurangi volume sampah yang dikirim ke tempat pembuangan akhir.
            </li>
            <li className="mb-2">
              <strong>Daur Ulang:</strong> Mengumpulkan dan mengolah kembali sampah anorganik seperti kertas, plastik, dan logam untuk dijadikan produk baru. Daur ulang membantu mengurangi penumpukan sampah dan menghemat sumber daya alam.
            </li>
            <li className="mb-2">
              <strong>Komposting:</strong> Mengolah sampah organik menjadi kompos yang bisa digunakan sebagai pupuk alami. Komposting adalah cara efektif untuk mengurangi sampah organik dan menghasilkan pupuk yang berguna bagi pertanian dan perkebunan.
            </li>
            <li className="mb-2">
              <strong>Pengelolaan Sampah B3:</strong> Memerlukan penanganan khusus untuk memastikan bahan berbahaya tidak mencemari lingkungan. Sampah B3 harus diolah dengan prosedur yang aman dan sesuai dengan peraturan yang berlaku.
            </li>
          </ol>

          <p className="mt-6">Dengan memahami jenis-jenis sampah dan cara pengelolaannya, kita dapat mengambil langkah-langkah yang lebih bijak dalam mengelola sampah di kehidupan sehari-hari. Pengelolaan sampah yang baik tidak hanya bermanfaat bagi lingkungan, tetapi juga membantu menciptakan komunitas yang lebih bersih dan sehat.</p>
        </div>
      </div>
    </div>
  );
}

export default Newhal;
