<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // create permissions
        $readPermissions = [
            'read-user' => 'read-user',
            'read-petition' => 'read-petition',
        ];

        $writePermission = [
            'write-user' => 'write-user',
            'write-petition' => 'write-petition',
            'write-kforms' => 'write-kforms',
        ];

        $permissions = array_merge($readPermissions,$writePermission);

        foreach ($permissions as $permission){
            Permission::create(['name'=>$permission]);
        }

        // create roles and assign created permissions

        $role = Role::create(['name' => 'user']);
        $role->givePermissionTo(array_merge($readPermissions, ['write-kforms' => 'write-kforms']) );
//        $role->givePermissionTo(array_merge([$readPermissions],['k-forms'=>'k-forms']));

        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());
    }
}
