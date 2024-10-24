<template>
    <div class="flex justify-center items-center mt-20">
        <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="The #1 Vue UI Library" width="400">
            <template v-slot:title>
                <span class="font-weight-black">Welcome to CloudAssistant</span>
            </template>
            <v-card-text class="bg-surface-light pt-4">
                主界面内容还没想好，先随便写点东西吧
            </v-card-text>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import api from '@/api';
api.get("/dashboard/test?token=cloudassistant")
</script>