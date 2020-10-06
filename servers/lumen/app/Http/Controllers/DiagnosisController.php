<?php

namespace App\Http\Controllers;

use App\Diagnosis;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

class DiagnosisController extends Controller
{
    public function getAllDiagnosis()
    {
        return response()->json(Diagnosis::all());
    }

    public function getOneDiagnosis($pServerSideRowUuid)
    {
        return response()->json(Diagnosis::find($pServerSideRowUuid));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $Diagnosis = Diagnosis::insert($requestData['insert']);
        return response()->json($Diagnosis, 201);
    }
    
    public function delete($serverSideRowUuid, Request $request)
    {
        $Diagnosis = Diagnosis::findOrFail($serverSideRowUuid);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'discontinueNote' => $requestData['dNotes']
            );
            $Diagnosis->update($updateData);
        }

        $Diagnosis->delete();
        
        return response('Deleted successfully', 200);
    }
}
