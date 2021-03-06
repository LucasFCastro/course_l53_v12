<?php

namespace CodeFin\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeFin\Repositories\BankRepository;
use CodeFin\Models\Bank;
use CodeFin\Events\BankStoredEvent;
use Illuminate\Http\UploadedFile;

/**
 * Class BankRepositoryEloquent
 * @package namespace CodeFin\Repositories;
 */
class BankRepositoryEloquent extends BaseRepository implements BankRepository
{

    public function create(array $attributes)
    {
        $logo = $attributes['logo'];
        $attributes['logo'] = env('BANK_LOGO_DEFAULT');
        $model = parent::create($attributes);
        $event = new BankStoredEvent($model, $logo);
        event($event);

        return $model;
    }

    public function update(array $attributes, $id)
    {
        $logo = null;
        if (isset($attributes['logo']) && $attributes['logo'] instanceof UploadedFile) {
            $logo = $attributes['logo'];
            unset($attributes['logo']);
        }

        $model = parent::update($attributes, $id);
        $event = new BankStoredEvent($model, $logo);
        event($event);

        return $model;
    }

    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Bank::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
