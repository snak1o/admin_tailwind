<template>
  <h1 class="text-3xl">Пользователи</h1>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 w-10">
          <input type="checkbox"/>
        </th>
        <th scope="col" class="px-6 py-3">
          ID
        </th>
        <th scope="col" class="px-6 py-3">
          Имя
        </th>
        <th scope="col" class="px-6 py-3">
          Почта
        </th>
        <th scope="col" class="px-6 py-3">
          Телефон
        </th>
        <th scope="col" class="px-6 py-3">
          Адрес
        </th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-white border-b" >
<!--        v-for="user in users.slice().reverse()" :key="user.id"-->
        <td class="px-6 py-4">
          <input type="checkbox"/>
        </td>
        <td class="px-6 py-4">
          1
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          Ruslan Lysenko
        </th>
        <td class="px-6 py-4">
          snakwcs@gmail.com
        </td>
        <td class="px-6 py-4">
          +358452614228
        </td>
        <td class="px-6 py-4">
          Apple street 1 A 10, 00920 Helsinki
        </td>
        <td class="px-6 py-4 text-right">
          <router-link to="/users/edit/1" class="font-medium text-blue-600 hover:underline">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Users"
}
</script>

<style scoped>

</style>