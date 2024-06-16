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

        const subEntities = entity[fieldName as keyof T] as unknown[];

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

  async createRelationItem<T extends Base>(key: keyof TEntity) {
    const relationCollection = this.entity![key] as unknown[];

    if (relationCollection) {
      const relations = this.repo.relations(
        this.entity as TEntity
      ) as RepositoryRelations<TEntity>;

      relationCollection.push((relations[key] as Repository<T>).create());
    }
  }

  async deleteRelationItemById<T extends Base>(
    key: keyof TEntity,
    id: idType<T>
  ) {
    const relationCollection = this.entity![key] as T[];

    const itemToDelete = relationCollection.find((item) => item.id === id);
    if (itemToDelete) {
      return this.deleteRelationItem(key, itemToDelete);
    }
  }

  async deleteRelationItem<T extends Base>(key: keyof TEntity, item: T) {
    const relationCollection = this.entity![key] as Base[];

    relationCollection.splice(relationCollection.indexOf(item), 1);
    //TODO: deletes the item immediately, not on save
    if (relationCollection) {
      const relations = this.repo.relations(
        this.entity as TEntity
      ) as RepositoryRelations<TEntity>;
      (relations[key] as Repository<T>).delete(item.id as idType<T>);
    }
  }
}
