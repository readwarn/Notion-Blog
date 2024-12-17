<template>
  <PaginationRoot :total="46" :sibling-count="0" :default-page="1">
    <PaginationList
      v-slot="{ items }"
      class="flex items-center gap-1 text-foreground"
    >
      <!-- <PaginationFirst
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded"
      >
        <ChevronsLeft />
      </PaginationFirst> -->
      <PaginationPrev
        class="w-9 h-9 flex items-center justify-center mr-4 disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded"
      >
        <ChevronLeft />
      </PaginationPrev>
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          class="w-9 h-9 border rounded data-[selected]:bg-foreground data-[selected]:text-background hover:bg-foreground/10 transition focus-within:outline focus-within:outline-1 focus-within:outline-offset-1"
          :value="page.value"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="w-9 h-9 flex items-center justify-center"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext
        class="w-9 h-9 flex items-center justify-center ml-4 disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded"
      >
        <ChevronRight />
      </PaginationNext>
      <!-- <PaginationLast
        class="w-9 h-9 flex items-center justify-center disabled:opacity-50 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 rounded"
      >
        <ChevronsRight />
      </PaginationLast> -->
    </PaginationList>
  </PaginationRoot>
</template>

<script lang="ts" setup>
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
</script>
