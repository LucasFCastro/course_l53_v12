<template>
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Example Component {{tempo}}</div>

                <div class="panel-body">
                    Eu sou umcomponente.
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        console.log('Component ready.')
    },
    data() {
        return {
            tempo: Date.now()
        }
    }
}
</script>
