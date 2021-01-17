<template>
  <div class="mt-10">
    <div class="flex flex-wrap justify-center">
      <!-- Athlete Buttons -->
      <section>
        <div class="flex flex-wrap w-2/3 m-auto">
          <div
            class="w-1/5 h-12 p-1"
            v-for="athlete in state.athletes"
            :key="athlete.firstName"
          >
            <button
              @click="athletePressed(athlete)"
              class="shadow w-full h-full bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
            >
              {{ athlete.firstName }}
            </button>
          </div>
        </div>
      </section>

      <!-- List of Comments -->
      <div class="mt-20">
        <div class="flex justify-between mb-2">
          <h1 class="text-3xl text-indigo-700">Comments</h1>
          <h1 class="text-white bg-indigo-400 rounded-full p-2">
            {{ commentsCount }}
          </h1>
        </div>
        <p class="text-sm text-red-700" v-if="error">{{ error }}</p>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Week #
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Athlete
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Comment
              </th>
              <th
                class="px-3 py-3 bg-indigo-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="comment in state.comments" :key="comment.id">
              <td class="px-3 py-4 text-sm">
                {{ correct(comment.commentDate) }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ comment.weekNumber }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ comment.athleteName }}
              </td>
              <td
                class="px-3 py-4 text-sm"
                :class="[
                  comment.commentType === 'Incident' ? 'bg-red-200' : '',
                  comment.commentType === 'Medical' ? 'bg-yellow-200' : '',
                  comment.commentType === 'General' ? 'bg-green-200' : '',
                ]"
              >
                {{ comment.commentType }}
              </td>
              <td class="px-3 py-4 text-sm">
                {{ comment.comment }}
              </td>
              <td class="px-3 py-4 text-sm">
                <div class="flex justify-evenly">
                  <button>
                    <i
                      class="fa fa-pencil text-indigo-900"
                      @click="updatePressed(comment)"
                    ></i>
                  </button>
                  <button>
                    <i
                      class="fas fa-trash text-red-900"
                      @click="deletePressed(comment._id)"
                    ></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <teleport to="body">
      <CommentModal
        v-if="modalIsOpen"
        @close="modalIsOpen = false"
        @fetch="reloadData"
        :athleteData="selectedAthlete"
      />
      <UpdateCommentModal
        v-if="updateModalIsOpen"
        @close="updateModalIsOpen = false"
        @fetch="reloadData"
        :commentData="selectedComment"
      />
    </teleport>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { correct } from "../js/helpers";
import CommentModal from "../components/CommentModal";
import UpdateCommentModal from "../components/UpdateCommentModal";
import CommentService from "../services/CommentService";
import AthleteService from "../services/AthleteService";

export default {
  components: { CommentModal, UpdateCommentModal },
  setup() {
    const state = reactive({
      comments: [],
      athletes: {},
    });
    const error = ref("");
    const selectedAthlete = ref({});
    const selectedComment = ref({});
    const modalIsOpen = ref(false);
    const updateModalIsOpen = ref(false);

    const commentsCount = computed({
      get: () => state.comments.length,
    });

    const reloadData = async () => {
      state.comments = await CommentService.getAll();
    };

    const athletePressed = (name) => {
      modalIsOpen.value = true;
      selectedAthlete.value = name;
    };

    const updatePressed = (comment) => {
      selectedComment.value = comment;
      updateModalIsOpen.value = true;
    };

    const deletePressed = async (id) => {
      await CommentService.deleteOne(id);
      state.comments = await CommentService.getAll();
    };

    onMounted(async () => {
      try {
        state.athletes = await AthleteService.getAllActive();
        state.comments = await CommentService.getAll();
      } catch (err) {
        error.value = err.message;
      }
    });

    return {
      state,
      error,
      selectedAthlete,
      selectedComment,
      modalIsOpen,
      updateModalIsOpen,
      commentsCount,
      reloadData,
      athletePressed,
      updatePressed,
      deletePressed,
      correct,
    };
  },
};
</script>

<style>
</style>