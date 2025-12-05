import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const asociadosData = [
  {
    "codigo": "asoc001",
    "nombre": "Juan Pérez",
    "identificacion": "10203040",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc002",
    "nombre": "María Gómez",
    "identificacion": "99442211",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc003",
    "nombre": "Carlos Rodríguez",
    "identificacion": "55667788",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc004",
    "nombre": "Laura Martínez",
    "identificacion": "77441122",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc005",
    "nombre": "Santiago Herrera",
    "identificacion": "90887766",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc006",
    "nombre": "Ana Sofía Rivas",
    "identificacion": "11223344",
    "estado_pipeline": "Pendiente Cierre de Crédito"
  },
  {
    "codigo": "asoc007",
    "nombre": "Valentina Ospina",
    "identificacion": "66778899",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc008",
    "nombre": "Mateo Castaño",
    "identificacion": "33445566",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc009",
    "nombre": "Samuel Rivera",
    "identificacion": "22003344",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc010",
    "nombre": "Juliana Pardo",
    "identificacion": "88112233",
    "estado_pipeline": "Pendiente Firma y Litivo"
  },
  {
    "codigo": "asoc011",
    "nombre": "Andrés Nieto",
    "identificacion": "66554433",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc012",
    "nombre": "Camila Peña",
    "identificacion": "99880011",
    "estado_pipeline": "Pendiente Revisión Abogado"
  },
  {
    "codigo": "asoc013",
    "nombre": "Esteban Quintero",
    "identificacion": "44112233",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc014",
    "nombre": "Daniela Torres",
    "identificacion": "12344321",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc015",
    "nombre": "Felipe Ramírez",
    "identificacion": "65432198",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc016",
    "nombre": "Sara Medina",
    "identificacion": "88997766",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc017",
    "nombre": "Tomás Aguilar",
    "identificacion": "33221100",
    "estado_pipeline": "Pendiente Generar Crédito"
  },
  {
    "codigo": "asoc018",
    "nombre": "Lucía Fonseca",
    "identificacion": "44778899",
    "estado_pipeline": "Desembolsado/Finalizado"
  },
  {
    "codigo": "asoc019",
    "nombre": "Elena Vargas",
    "identificacion": "55118822",
    "estado_pipeline": "Pendiente Firma y Litivo"
  },
  {
    "codigo": "asoc020",
    "nombre": "Sebastián Duarte",
    "identificacion": "77001122",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc021",
    "nombre": "Gabriela Castro",
    "identificacion": "44553311",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc022",
    "nombre": "Marcos Molina",
    "identificacion": "22334455",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc023",
    "nombre": "Isabella Campos",
    "identificacion": "99887744",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc024",
    "nombre": "Diana Salazar",
    "identificacion": "11002233",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc025",
    "nombre": "Juan Sebastián Rojas",
    "identificacion": "88776655",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc026",
    "nombre": "Natalia Guzmán",
    "identificacion": "66770011",
    "estado_pipeline": "Pendiente Firma y Litivo"
  },
  {
    "codigo": "asoc027",
    "nombre": "Simón Carrillo",
    "identificacion": "55664433",
    "estado_pipeline": "Pendiente Revisión Abogado"
  },
  {
    "codigo": "asoc028",
    "nombre": "Laura Castillo",
    "identificacion": "22990011",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc029",
    "nombre": "Andrés Cifuentes",
    "identificacion": "77889900",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc030",
    "nombre": "Daniela López",
    "identificacion": "33001122",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc031",
    "nombre": "Miguel Ortiz",
    "identificacion": "66558844",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc032",
    "nombre": "Adriana Sierra",
    "identificacion": "12003456",
    "estado_pipeline": "Pendiente Cierre de Crédito"
  },
  {
    "codigo": "asoc033",
    "nombre": "David Patiño",
    "identificacion": "99881122",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc034",
    "nombre": "Mariana Roldán",
    "identificacion": "88115544",
    "estado_pipeline": "Desembolsado/Finalizado"
  },
  {
    "codigo": "asoc035",
    "nombre": "Luis Camacho",
    "identificacion": "33446688",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc036",
    "nombre": "Sofía Vargas",
    "identificacion": "22114455",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc037",
    "nombre": "Andrés Melo",
    "identificacion": "44335522",
    "estado_pipeline": "Pendiente Revisión Abogado"
  },
  {
    "codigo": "asoc038",
    "nombre": "Paula Montoya",
    "identificacion": "55667700",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc039",
    "nombre": "Camilo Lozano",
    "identificacion": "11992233",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc040",
    "nombre": "Victoria Herrera",
    "identificacion": "77884455",
    "estado_pipeline": "Pendiente Firma y Litivo"
  },
  {
    "codigo": "asoc041",
    "nombre": "Julián Cárdenas",
    "identificacion": "33225566",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc042",
    "nombre": "Selena Rincón",
    "identificacion": "55001122",
    "estado_pipeline": "Expediente en Construcción"
  },
  {
    "codigo": "asoc043",
    "nombre": "Manuel Gaitán",
    "identificacion": "44776655",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc044",
    "nombre": "Diana Moreno",
    "identificacion": "99001122",
    "estado_pipeline": "Cartera Activa"
  },
  {
    "codigo": "asoc045",
    "nombre": "Juan Pablo Castaño",
    "identificacion": "66778844",
    "estado_pipeline": "Pendiente Cierre de Crédito"
  },
  {
    "codigo": "asoc046",
    "nombre": "Carolina Silva",
    "identificacion": "22889911",
    "estado_pipeline": "Pendiente Jurídico"
  },
  {
    "codigo": "asoc047",
    "nombre": "Esteban Álvarez",
    "identificacion": "44119988",
    "estado_pipeline": "Desembolsado/Finalizado"
  },
  {
    "codigo": "asoc048",
    "nombre": "Sara Ríos",
    "identificacion": "77331122",
    "estado_pipeline": "Pendiente Revisión Abogado"
  },
  {
    "codigo": "asoc049",
    "nombre": "Tomás Benítez",
    "identificacion": "66002211",
    "estado_pipeline": "Prospecto"
  },
  {
    "codigo": "asoc050",
    "nombre": "Natalia Jiménez",
    "identificacion": "99884411",
    "estado_pipeline": "Expediente en Construcción"
  }
]

async function main() {
  console.log('Starting seed...')
  
  for (const asociado of asociadosData) {
    await prisma.asociado.create({
      data: {
        codigo: asociado.codigo,
        nombre: asociado.nombre,
        identificacion: asociado.identificacion,
        estado_pipeline: asociado.estado_pipeline
      }
    })
  }
  
  console.log('Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
