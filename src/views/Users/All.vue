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
          логин
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
      <tr class="bg-white border-b border-gray-200" v-for="user in users.slice().reverse()" :key="user.id">
        <td class="px-6 py-4">
          <input type="checkbox"/>
        </td>
        <td class="px-6 py-4">
          {{user.id}}
        </td>
        <td class="px-6 py-4" :class="user.admin ? 'text-red-500' : ''">
          {{user.login}}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {{user.firstName ? user.firstName + " " + user.lastName : 'Не указано'}}
        </th>
        <td class="px-6 py-4">
          {{user.email}}
        </td>
        <td class="px-6 py-4">
          {{user.phone ? "+" + user.phone.phoneCode + user.phone.phoneNumber : 'Не указано'}}
        </td>
        <td class="px-6 py-4">
          {{user.invoiceAddress ? user.invoiceAddress.street + " " + user.invoiceAddress.zip + " " + user.invoiceAddress.city +  " " + user.invoiceAddress.country : "Не указано"}}
        </td>
        <td class="px-6 py-4 text-right">
          <router-link :to="`/users/edit/${user.id}`" class="font-medium text-blue-600 hover:underline">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: [],
    }
  },
  async mounted() {
    const res = await this.$axios.get('/api/v1/users/all')
    this.users = res.data
  }
}
</script>

<style scoped>

</style>