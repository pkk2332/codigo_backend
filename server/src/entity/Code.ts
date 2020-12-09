import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Evoucher } from './Evoucher';

@Entity()
export class Code {
	@PrimaryGeneratedColumn() id: number;

	@Column() promo_code: string;
	@Column() qr_image: string;
	@Column({ default: false })
	used: boolean;

	@ManyToOne(() => Evoucher, (evoucher) => evoucher.id, {
		eager: true
	})
	evoucher: Evoucher;

	@Column({
		default: false
	})
	sold_out: boolean;
}
