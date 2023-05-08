#generate database model

echo "💲Generating tables .... 📦"

# sequelize model:generate --name Rt --attributes kepala_rt:string,rt:string,rw:string,kelurahan:string,kecamatan:string,kecamatan:string,kotaKabupaten:string,provinsi:string

# sequelize model:generate --name User --attributes namaLengkap:string,nomorTelp:string,email:string,password:string,role:string,nomorKk:string,nomorKtp:string,status:boolean,rt_id:integer,status_keluarga:enum,kkImg:string,ktpImg:string,photoUrl:string,aktaImg:string,agama:string,jenis_kelamin:string,status_perkawinan:string,pekerjaan:string,tempat_lahir:string,tanggal_lahir:DATE

# sequelize model:generate --name Post --attributes name:string,rt_id:integer,deskripsi:text,kategori:enum,lokasi:string,biaya:integer,dibayar:boolean

# sequelize model:generate --name Vehicle --attributes name:string,nomorPolisi:string,user_id:integer

# sequelize model:generate --name Kas --attributes rt_id:integer,nominal:integer,alur:enum,deskripsi:string

# sequelize model:generate --name Guest --attributes name:string,user_id:integer,nomorKtp:string

# sequelize model:generate --name Service --attributes name:string,rt_id:integer,user_id:integer,deskripsi:text,status:enum

# sequelize model:generate --name Comment --attributes comment:text,user_id:integer,post_id:integer

# sequelize model:generate --name Payment --attributes user_id:integer,post_id:integer,nominal:integer

echo "💲Generate success ✅"