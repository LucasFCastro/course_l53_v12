<?php

namespace CodeFin\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use CodeFin\Repositories\BankRepository;
use CodeFin\Models\Bank;
use CodeFin\Validators\BankValidator;
use CodeFin\Events\BankStoredEvent;

/**
 * Class BankRepositoryEloquent
 * @package namespace CodeFin\Repositories;
 */
class BankRepositoryEloquent extends BaseRepository implements BankRepository
{

    public function create(array $attributes)
    {
        $logo = $attributes['logo'];
        $attributes['logo'] = "semimage.jpeg";
        $model = parent::create($attributes);
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
