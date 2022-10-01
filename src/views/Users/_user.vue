<template>
  <h1 class="text-3xl mb-5">Информация о пользователе {{user.login}}</h1>
  <div class="flex flex-col w-1/2">
    <div class="flex w-full space-x-5">
      <div class="flex flex-col mb-2 w-full">
        <label class="text-gray-600 mb-1" for="firstname">Имя</label>
        <input type="text" v-model="user.firstName" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col mb-2 w-full">
        <label class="text-gray-600 mb-1" for="lastname">Фамилия</label>
        <input type="text" v-model="user.lastName" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
      </div>
    </div>
    <div class="flex flex-col mb-2 w-full">
      <label class="text-gray-600 mb-1" for="login">Логин</label>
      <input type="text" v-model="user.login" id="login" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
    </div>
    <div class="flex mb-2 w-full space-x-5">
      <div class="flex flex-col w-1/6">
        <label class="text-gray-600 mb-1" for="phoneCode">Код страны</label>
        <input type="text" id="phoneCode" v-model="user.phone.phoneCode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
      </div>
      <div class="flex flex-col w-5/6">
        <label class="text-gray-600 mb-1" for="phoneNumber">Номер телефона</label>
        <input type="text" v-model="user.phone.phoneNumber" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
      </div>
    </div>
    <div class="flex flex-col mb-2 w-full">
      <label class="text-gray-600 mb-1" for="email">Почта
        (<span v-if="user.completed" class="text-green-600">подтверждено</span><span v-else class="text-red-600">не подтверждено</span>)
      </label>
      <input type="text" v-model="user.email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none" required/>
    </div>
    <div class="flex flex-col mb-2 w-full">
      <label class="text-gray-600 mb-1">Адрес счета</label>
      <div class="flex w-full mb-2 space-x-5">
        <input type="text" v-model="user.invoiceAddress.street" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-2/3" placeholder="Улица" required/>
        <input type="text" v-model="user.invoiceAddress.zip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/3" placeholder="Индекс" required/>
      </div>
      <div class="flex w-full mb-2 space-x-5">
        <input type="text" v-model="user.invoiceAddress.city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/2" placeholder="Город" required/>
        <input type="text" v-model="user.invoiceAddress.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/2" placeholder="Страна" required/>
      </div>
    </div>
    <div class="flex flex-col mb-2 w-full">
      <label class="text-gray-600 mb-1">Адрес доставки</label>
      <div class="flex w-full mb-2 space-x-5">
        <input type="text" v-model="user.shippingAddress.street" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-2/3" placeholder="Улица" required/>
        <input type="text" v-model="user.shippingAddress.zip" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/3" placeholder="Индекс" required/>
      </div>
      <div class="flex w-full mb-2 space-x-5">
        <input type="text" v-model="user.shippingAddress.city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/2" placeholder="Город" required/>
        <input type="text" v-model="user.shippingAddress.country" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none w-1/2" placeholder="Страна" required/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "_user",
  data() {
    return {
      user: {
        phone: {},
        shippingAddress: {},
        invoiceAddress: {},
      },
    }
  },
  async mounted() {
    try {
      const res = await this.$axios.get('/api/v1/users/' + this.$route.params.id)
      if (res && res.status === 200) {
        this.user = res.data
      }
    } catch (e) {
      if (e.response) {
        switch (e.response) {
          case 404: {
            this.$store.dispatch('addNotification', "Пользователь не найден.")
            return
          }
        }
      }
      else {
        this.$store.dispatch('addNotification', `Ошибка ${e.message}.`)
      }
    }
  }
}
</script>

<style scoped>

</style>