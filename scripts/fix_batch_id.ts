import { PrismaClient } from '@prisma/client'
import { numberToHex } from '@zero-labs/tokenization';
import { isHexString } from 'ethers/lib/utils';

(async () => {
    const prisma = new PrismaClient({ 
        datasources: {
            db: {
                url: '' // POSTGRES URL HERE
            }
        }
    });

    const allBatches = await prisma.batch.findMany();

    for (let batch of allBatches) {
        if (!isHexString(batch.id, 32)) {
            console.log(`Batch ${batch.id} is not a hex string. Fixing...`);

            const newBatchId = numberToHex(Number(batch.id));

            await prisma.batch.update({
                where: {
                    id: batch.id,
                },
                data: {
                    id: newBatchId
                },
            });

            console.log(`Batch ${batch.id} has been converted to ${newBatchId}...`);
        } else {
            console.log(`Batch ${batch.id} is already a hex string. Skipping...`);
        }
    }
})();
