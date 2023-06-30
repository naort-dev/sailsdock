<template>
  <div>
    <p v-if="!(activities && activities.length > 0)" class="ui-size --md">
      {{ $t('noActivityYet') }}
    </p>
    <table v-if="activities && activities.length > 0" class="table">
      <thead>
        <tr>
          <th scope="col">Event</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, i) in activities" :key="i">
          <td>
            <span
              class="overview-link"
              @click="
                $router.push(
                  `/project/${$route.params.id}/dock/${activity.id}/overview`
                )
              "
              >{{ activity.title }}</span
            >&nbsp;{{ action[activity.action] }}&nbsp;by&nbsp;{{
              activity.created_by
            }}
          </td>
          <td>
            <span
              data-toggle="tooltip"
              data-placement="top"
              :title="new Date(activity.created_at.seconds * 1000)"
            >
              {{
                $moment(activity.created_at.seconds * 1000, 'x').format(
                  'YYYY-MM-DD'
                )
              }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Activity',
  props: ['project'],
  data() {
    return {
      activities: this.project.activities,
      action: {
        create: 'created',
        add: 'added',
        delete: 'deleted'
      }
    }
  }
}
</script>
<style lang="scss">
.overview-link {
  cursor: pointer;
  color: blue;
}
</style>
