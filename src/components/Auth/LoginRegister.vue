<template>
  <form @submit.prevent="onFormSubmited">
    <div class="row">
      <q-banner class="bg-grey-3 col q-mb-md">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ mode | titleCase }} to access your todos anywhere!
      </q-banner>
    </div>
    <div class="row">
      <q-input
        class="col q-mb-md"
        outlined
        v-model="formData.email"
        label="Email"
        ref="email"
        stack-label
        :rules="[
          (val) => validateEmail(val) || 'Please use maximum 6 characters',
        ]"
        lazy-rules
      />
    </div>
    <div class="row">
      <q-input
        class="col q-mb-md"
        outlined
        ref="password"
        type="password"
        v-model="formData.password"
        label="Password"
        stack-label
        :rules="[(val) => val.length >= 6 || 'Please use maximum 6 characters']"
        lazy-rules
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="mode" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["mode"],
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    onFormSubmited() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.mode == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
  filters: {
    titleCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style>
</style>