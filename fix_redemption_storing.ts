import { parse as parseCsv } from 'csv-parse/sync';
import { readFileSync } from 'fs';
const certificatesCsvPath = 'certificates.csv';
import { PrismaClient } from '@prisma/client'

type ICertificateRow = {
  redemptionStatementId: string,
  AttestationCid: string
}

(async () => {
  const rows: ICertificateRow[] = parseCsv(readFileSync(certificatesCsvPath), { columns: true });

  for (let row of rows) {
    console.log({row});

    const prisma = new PrismaClient();

    const batch = await prisma.batch.findFirst({
      where: { redemptionStatementId: row.redemptionStatementId }
    });

    if (batch && row.AttestationCid) {
      const updateBatch = await prisma.batch.update({
        where: {
          redemptionStatementId: row.redemptionStatementId,
        },
        data: {
          redemptionStatementId: row.AttestationCid
        },
      })
    }
  }
})();
