import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Repository } from 'remult';
import { getRelationFieldInfo } from 'remult/internals';
import { RepositoryRelations, idType } from 'remult/src/remult3/remult3';
import { Base } from '../../../shared/entities/base';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export abstract class EditComponent<TEntity extends Base> implements OnInit {
  entity?: TEntity;

  @Input() id!: idType<TEntity>;
  abstract repo: Repository<TEntity>;
  fields: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    this.fields = this.repo.metadata.fields;

    if (this.id == 'new') {
      this.entity = await this.repo.create();
    } else {
      this.entity = await this.repo.findId(this.id);
    }
    console.log('Entity:', this.entity);
  }

  protected async saveChanges() {
    if (this.entity) {
      //   this.entity = await this.repo.save(this.entity);
      //   this.router.navigate(['/crm/company/', this.entity.id]);

      //   const fieldNames = Object.getOwnPropertyNames(this.entity).filter(
      //     (fieldName) => getRelationFieldInfo(this.fields[fieldName])
      //   );

      //   for (const fieldName of fieldNames) {
      //     await (
      //       this.repo.relations(this.entity!)[
      //         fieldName as keyof RepositoryRelations<TEntity>
      //       ] as Repository<unknown>
      //     ).save(this.entity[fieldName as keyof TEntity] as unknown[]);
      //   }
      // }
      this.entity = await this.saveRelations(this.repo, this.entity);
    }
    this.router.navigate(['/crm/company/', this.entity!.id]);
  }

  async saveRelations<T>(repo: Repository<T>, entity: T) {
    if (entity) {
      const result = await repo.save(entity);

      const fieldNames = Object.getOwnPropertyNames(entity).filter(
        (fieldName) =>
          getRelationFieldInfo(repo.metadata.fields[fieldName as keyof T])
      );

      for (const fieldName of fieldNames) {
        const subRepo = repo.relations(entity)[
          fieldName as keyof RepositoryRelations<T>
        ] as Repository<unknown>;

        const subEntities = entity[
          fieldName as keyof T
        ] as unknown[];

        for (let index = 0; index < subEntities.length; index++) {
          const subEntity = subEntities[index];
          const subResult = await this.saveRelations(subRepo, subEntity);
          (result[fieldName as keyof T] as unknown[])[index] = subResult;
        }

      }
      return result;
    }
    return undefined;
  }
}
