import { OnModuleInit } from "@nestjs/common";
import { InventoryService } from "@zero-labs/tokenization-api";

export class InventoryIdController implements OnModuleInit {
    private inventoryId: string;

    constructor(public readonly inventory: InventoryService) {}

    async onModuleInit() {
        const [{ netId, topic }] = await this.inventory.getAll();
        this.inventoryId = netId + '_' + topic;
    }

    getInventoryId(): string {
        return this.inventoryId;
    }
}