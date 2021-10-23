import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () =>
    import ("@/containers/TheContainer");

// Auth
const Auth = () =>
    import ("@/views/auth/Login");

// Employee lists
const EmployeeLists = () =>
    import ("@/views/employees/Lists");

// Employee add
const EmployeeCreate = () =>
    import ("@/views/employees/Create");

// Employee update
const EmployeeUpdate = () =>
    import ("@/views/employees/Update");

// Employee View
const EmployeeView = () =>
    import ("@/views/employees/View");

// Task lists
const TaskLists = () =>
    import ("@/views/tasks/Lists");

// Task add
const TaskCreate = () =>
    import ("@/views/tasks/Create");

// Task update
const TaskUpdate = () =>
    import ("@/views/tasks/Update");

// Task View
const TaskView = () =>
    import ("@/views/tasks/View");

// Role lists
const RoleLists = () =>
    import ("@/views/roles/Lists");

// Role add
const RoleCreate = () =>
    import ("@/views/roles/Create");

// Role update
const RoleUpdate = () =>
    import ("@/views/roles/Update");

// Permission add
const PermissionCreate = () =>
    import ("@/views/roles/NewPermission");

// Permission update
const PermissionUpdate = () =>
    import ("@/views/roles/EditPermission");

Vue.use(Router);

export default new Router({
    mode: "history",
    linkActiveClass: "active",
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes(),
});

function configRoutes() {
    return [{
            path: "/",
            redirect: "/auth",
        },
        {
            path: "/employees",
            name: "Employees",
            component: TheContainer,
            children: [{
                    path: "/",
                    name: "Employee Lists",
                    component: EmployeeLists,
                },
                {
                    path: "add",
                    name: "Employee Add",
                    component: EmployeeCreate,
                },
                {
                    path: "view/:id",
                    name: "Employee View",
                    component: EmployeeView,
                },
                {
                    path: "update/:id",
                    name: "Employee View",
                    component: EmployeeUpdate,
                },
            ],
        },
        {
            path: "/tasks",
            name: "task Schedules",
            component: TheContainer,
            children: [{
                    path: "/",
                    name: "Task Lists",
                    component: TaskLists,
                },
                {
                    path: "add",
                    name: "Task Add",
                    component: TaskCreate,
                },
                {
                    path: "view/:id",
                    name: "Task View",
                    component: TaskView,
                },
                {
                    path: "update/:id",
                    name: "Task View",
                    component: TaskUpdate,
                },
            ],
        },
        {
            path: "/roles",
            name: "Role & Permissions",
            component: TheContainer,
            children: [{
                    path: "/",
                    name: "Role Lists",
                    component: RoleLists,
                },
                {
                    path: "add",
                    name: "Role Add",
                    component: RoleCreate,
                },
                {
                    path: "update/:id",
                    name: "Role View",
                    component: RoleUpdate,
                },
            ],
        },
        {
            path: "/permission",
            name: "Role & Permissions",
            component: TheContainer,
            children: [{
                    path: "add",
                    name: "Permission Add",
                    component: PermissionCreate,
                },
                {
                    path: "update/:id",
                    name: "Permission View",
                    component: PermissionUpdate,
                },
            ],
        },
        {
            path: "/auth",
            name: "Auth",
            component: Auth,
        },
    ];
}