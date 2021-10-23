export default [{
    _name: "CSidebarNav",
    _children: [{
            _name: "CSidebarNavTitle",
            _children: ["Menu"],
        },
        {
            _name: "CSidebarNavItem",
            name: "Employees",
            to: "/employees",
            icon: "cil-people",
        },
        {
            _name: "CSidebarNavItem",
            name: "Task Schedules",
            to: "/tasks",
            icon: "cil-task",
        },
        {
            _name: "CSidebarNavItem",
            name: "Role & Permissions",
            to: "/roles",
            icon: "cil-shield-alt",
        },
    ],
}, ];