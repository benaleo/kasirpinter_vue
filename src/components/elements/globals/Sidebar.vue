<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/services/AuthService";
import { toast } from "vue-sonner";
import type { MenuType } from "@/types/MenuType";
import Dashboard from "@/views/cms/Dashboard.vue";

// Menu items.
const menus: MenuType[] = [
  {
    group: "Dashboard",
    items: [
      { title: "Home", url: "/v1/dashboard", component: Dashboard, icon: "Home" },
    ],
  },
  {
    group: "Toko",
    items: [
      { title: "Transaksi", url: "/v1/transaction", component: Dashboard, icon: "Calendar" },
      { title: "Produk", url: "/v1/product", component: Dashboard, icon: "Box" },
      { title: "Kategori Produk", url: "/v1/product-category", component: Dashboard, icon: "Box" },
    ],
  },
  {
    group: "Perusahaan",
    items: [
      { title: "Cabang", url: "/v1/company", component: Dashboard, icon: "Calendar" },
      { title: "Kategori Perusahaan", url: "/v1/company-category", component: Dashboard, icon: "Box" },
      { title: "Karyawan", url: "/v1/employee", component: Dashboard, icon: "Box" },
      { title: "Shift", url: "/v1/shift", component: Dashboard, icon: "Box" },
      { title: "Jabatan", url: "/v1/position", component: Dashboard, icon: "Box" },
    ],
  },
  {
    group: "Laporan",
    items: [
      { title: "Lapor Pajak", url: "/v1/tax", component: Dashboard, icon: "Calendar" },
    ],
  },
  {
    group: "Admin",
    items: [
      { title: "User", url: "/v1/user", component: Dashboard, icon: "Calendar" },
      { title: "Role", url: "/v1/role", component: Dashboard, icon: "Calendar" },
    ],
  },

];

const _supabase = useAuth();
const logout = async () => {
  await _supabase.logout();
  toast.success("Berhasil logout")
  window.location.href = "/login"
}
</script>

<template>
  <Sidebar>
    <SidebarContent class="flex flex-col justify-between pb-4">
      <div>
        <SidebarGroup v-for="(menu, index) in menus" :key="index">
        <SidebarGroupLabel>{{ menu.group }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menu.items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      </div>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <a @click="logout" class="border rounded-lg w-full py-4 text-center bg-amber-200"
              :href="`/login`"><span>Logout</span></a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
</template>